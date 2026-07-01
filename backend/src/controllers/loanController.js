const { v4: uuidv4 } = require('uuid');

async function getAvailableLoans(request, reply) {
  const db = request.server.db;
  const loans = await db('loans')
    .join('users', 'loans.borrower_id', '=', 'users.id')
    .join('profiles', 'users.id', '=', 'profiles.user_id')
    .where('loans.status', 'FUNDING')
    .select(
      'loans.*',
      'profiles.first_name',
      'profiles.last_name'
    );
    
  return loans;
}

async function createLoanRequest(request, reply) {
  const db = request.server.db;
  const userId = request.user.id;
  const { amount, interest_rate, term_months, description } = request.body;

  const user = await db('users').where({ id: userId }).first();
  if (user.kyc_status !== 'VERIFIED') {
    return reply.status(403).send({ error: 'User must be KYC verified to apply for a loan' });
  }

  const profile = await db('profiles').where({ user_id: userId }).first();
  if (parseFloat(amount) > parseFloat(profile.max_loan_amount)) {
    return reply.status(400).send({ error: `Loan amount exceeds your limit of R${profile.max_loan_amount}` });
  }

  if (interest_rate > 35.4) {
    return reply.status(400).send({ error: 'Interest rate exceeds legal cap of 35.4% p.a.' });
  }

  const loanId = uuidv4();
  await db('loans').insert({
    id: loanId,
    borrower_id: userId,
    amount,
    interest_rate,
    term_months,
    description,
    status: 'FUNDING'
  });

  return { id: loanId, status: 'FUNDING' };
}

async function fundLoan(request, reply) {
  const db = request.server.db;
  const lenderId = request.user.id;
  const loanId = request.params.id;
  const { amount } = request.body;

  if (request.user.role !== 'LENDER') {
    return reply.status(403).send({ error: 'Only lenders can fund loans' });
  }

  return await db.transaction(async (trx) => {
    const loan = await trx('loans').where({ id: loanId }).first();
    if (!loan || loan.status !== 'FUNDING') {
      throw new Error('Loan is not available for funding');
    }

    const wallet = await trx('wallets').where({ user_id: lenderId }).first();
    if (!wallet || wallet.balance < amount) {
      throw new Error('Insufficient funds in wallet');
    }

    const investments = await trx('investments').where({ loan_id: loanId });
    const currentFunding = investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
    const remaining = parseFloat(loan.amount) - currentFunding;

    if (amount > remaining) {
      throw new Error(`Investment exceeds remaining amount needed (R${remaining})`);
    }

    await trx('wallets')
      .where({ user_id: lenderId })
      .update({
        balance: parseFloat(wallet.balance) - parseFloat(amount),
        updated_at: trx.fn.now()
      });

    await trx('investments').insert({
      id: uuidv4(),
      loan_id: loanId,
      lender_id: lenderId,
      amount,
      status: 'ACTIVE'
    });

    await trx('transactions').insert({
      id: uuidv4(),
      user_id: lenderId,
      amount,
      type: 'FUNDING',
      status: 'COMPLETED',
      reference: `Funding loan ${loanId}`
    });

    if (parseFloat(currentFunding) + parseFloat(amount) >= parseFloat(loan.amount)) {
      await trx('loans').where({ id: loanId }).update({ status: 'ACTIVE' });
      
      const borrowerWallet = await trx('wallets').where({ user_id: loan.borrower_id }).first();
      if (!borrowerWallet) {
        await trx('wallets').insert({ user_id: loan.borrower_id, balance: loan.amount });
      } else {
        await trx('wallets')
          .where({ user_id: loan.borrower_id })
          .update({
            balance: parseFloat(borrowerWallet.balance) + parseFloat(loan.amount),
            updated_at: trx.fn.now()
          });
      }

      await trx('transactions').insert({
        id: uuidv4(),
        user_id: loan.borrower_id,
        amount: loan.amount,
        type: 'DEPOSIT',
        status: 'COMPLETED',
        reference: `Loan disbursement ${loanId}`
      });
    }

    return { message: 'Funding successful' };
  }).catch(err => {
    return reply.status(400).send({ error: err.message });
  });
}

async function getLoanDetails(request, reply) {
  const db = request.server.db;
  const loanId = request.params.id;

  const loan = await db('loans').where({ id: loanId }).first();
  if (!loan) {
    return reply.status(404).send({ error: 'Loan not found' });
  }

  const investments = await db('investments').where({ loan_id: loanId });
  const currentFunding = investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

  return {
    ...loan,
    current_funding: currentFunding,
    remaining_needed: parseFloat(loan.amount) - currentFunding
  };
}

async function getMyLoans(request, reply) {
  const db = request.server.db;
  const userId = request.user.id;
  const role = request.user.role;

  if (role === 'BORROWER') {
    const loans = await db('loans').where({ borrower_id: userId });
    return loans;
  } else if (role === 'LENDER') {
    const investments = await db('investments')
      .join('loans', 'investments.loan_id', '=', 'loans.id')
      .where('investments.lender_id', userId)
      .select('investments.*', 'loans.amount as loan_total_amount', 'loans.status as loan_status');
    return investments;
  }

  return [];
}

module.exports = {
  getAvailableLoans,
  createLoanRequest,
  fundLoan,
  getLoanDetails,
  getMyLoans
};
