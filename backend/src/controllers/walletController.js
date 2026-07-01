const { v4: uuidv4 } = require('uuid');

async function getBalance(request, reply) {
  const db = request.server.db;
  const userId = request.user.id;

  let wallet = await db('wallets').where({ user_id: userId }).first();
  
  if (!wallet) {
    // Lazy create wallet if it doesn't exist
    await db('wallets').insert({
      user_id: userId,
      balance: 0
    });
    wallet = { user_id: userId, balance: 0 };
  }

  return { balance: wallet.balance };
}

async function deposit(request, reply) {
  const db = request.server.db;
  const userId = request.user.id;
  const { amount, reference } = request.body;

  if (!amount || amount <= 0) {
    return reply.status(400).send({ error: 'Invalid amount' });
  }

  await db.transaction(async (trx) => {
    // Update or create wallet
    const wallet = await trx('wallets').where({ user_id: userId }).first();
    if (!wallet) {
      await trx('wallets').insert({
        user_id: userId,
        balance: amount
      });
    } else {
      await trx('wallets')
        .where({ user_id: userId })
        .update({
          balance: parseFloat(wallet.balance) + parseFloat(amount),
          updated_at: trx.fn.now()
        });
    }

    // Record transaction
    await trx('transactions').insert({
      id: uuidv4(),
      user_id: userId,
      amount,
      type: 'DEPOSIT',
      status: 'COMPLETED',
      reference: reference || 'Wallet Deposit'
    });
  });

  return { message: 'Deposit successful' };
}

async function withdraw(request, reply) {
  const db = request.server.db;
  const userId = request.user.id;
  const { amount, reference } = request.body;

  if (!amount || amount <= 0) {
    return reply.status(400).send({ error: 'Invalid amount' });
  }

  return await db.transaction(async (trx) => {
    const wallet = await trx('wallets').where({ user_id: userId }).first();
    
    if (!wallet || wallet.balance < amount) {
      throw new Error('Insufficient funds');
    }

    await trx('wallets')
      .where({ user_id: userId })
      .update({
        balance: parseFloat(wallet.balance) - parseFloat(amount),
        updated_at: trx.fn.now()
      });

    await trx('transactions').insert({
      id: uuidv4(),
      user_id: userId,
      amount,
      type: 'WITHDRAWAL',
      status: 'COMPLETED',
      reference: reference || 'Wallet Withdrawal'
    });

    return { message: 'Withdrawal successful' };
  }).catch(err => {
    return reply.status(400).send({ error: err.message });
  });
}

module.exports = {
  getBalance,
  deposit,
  withdraw
};
