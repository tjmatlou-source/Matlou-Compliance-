const { v4: uuidv4 } = require('uuid');

async function initiateCheck(request, reply) {
  const db = request.server.db;
  const userId = request.user.id;

  // Check if borrower has completed profile
  const profile = await db('profiles').where({ user_id: userId }).first();
  if (!profile || !profile.id_number || !profile.monthly_income) {
    return reply.status(400).send({ error: 'Please complete your profile first' });
  }

  const checkId = uuidv4();
  
  // Create a pending background check
  await db('background_checks').insert({
    id: checkId,
    user_id: userId,
    provider: 'VERILEND_INTERNAL_SIM',
    status: 'IN_PROGRESS',
    created_at: db.fn.now(),
    updated_at: db.fn.now()
  });

  // Simulate external API call/background process
  // In a real app, this would be an async task queue
  setImmediate(async () => {
    try {
      // Stub logic for credit score and max loan amount
      // Simulating a decent score for now
      const mockScore = 600 + Math.floor(Math.random() * 200);
      const mockMaxLoan = Math.floor(profile.monthly_income * 0.4 * 3); // 40% of income over 3 months as a rule of thumb
      
      const resultJson = {
        affordability_assessment: {
          monthly_income: profile.monthly_income,
          estimated_expenses: profile.monthly_income * 0.6,
          disposable_income: profile.monthly_income * 0.4
        },
        credit_bureau_data: {
          score: mockScore,
          defaults: 0,
          judgements: 0
        }
      };

      await db('background_checks')
        .where({ id: checkId })
        .update({
          status: 'COMPLETED',
          score: mockScore,
          max_loan_amount: mockMaxLoan,
          raw_result: JSON.stringify(resultJson),
          updated_at: db.fn.now()
        });
    } catch (err) {
      console.error('Error in background check simulation:', err);
    }
  });

  return { id: checkId, status: 'IN_PROGRESS' };
}

async function getCheckStatus(request, reply) {
  const db = request.server.db;
  const { id } = request.params;

  const check = await db('background_checks').where({ id }).first();
  if (!check) {
    return reply.status(404).send({ error: 'Background check not found' });
  }

  // Only allow the user or an admin to see the check
  if (check.user_id !== request.user.id && request.user.role !== 'ADMIN') {
    return reply.status(403).send({ error: 'Forbidden' });
  }

  return check;
}

async function approveCheck(request, reply) {
  const db = request.server.db;
  const { id } = request.params;

  // Only admin can approve
  if (request.user.role !== 'ADMIN') {
    return reply.status(403).send({ error: 'Only admins can approve background checks' });
  }

  const check = await db('background_checks').where({ id }).first();
  if (!check) {
    return reply.status(404).send({ error: 'Background check not found' });
  }

  if (check.status !== 'COMPLETED') {
    return reply.status(400).send({ error: 'Check is not completed yet' });
  }

  // Update user KYC status and max loan amount
  await db.transaction(async (trx) => {
    await trx('users')
      .where({ id: check.user_id })
      .update({ kyc_status: 'VERIFIED' });

    await trx('profiles')
      .where({ user_id: check.user_id })
      .update({ max_loan_amount: check.max_loan_amount });
      
    await trx('background_checks')
      .where({ id })
      .update({ status: 'APPROVED', updated_at: trx.fn.now() });
  });

  return { message: 'Background check approved, user is now verified' };
}

module.exports = {
  initiateCheck,
  getCheckStatus,
  approveCheck
};
