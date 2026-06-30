/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.uuid('id').primary();
      table.string('email').unique().notNullable();
      table.string('password_hash').notNullable();
      table.enum('role', ['BORROWER', 'LENDER', 'ADMIN']).notNullable().defaultTo('BORROWER');
      table.enum('kyc_status', ['PENDING', 'VERIFIED', 'REJECTED']).notNullable().defaultTo('PENDING');
      table.timestamps(true, true);
    })
    .createTable('profiles', (table) => {
      table.uuid('user_id').primary().references('id').inTable('users').onDelete('CASCADE');
      table.string('first_name');
      table.string('last_name');
      table.string('id_number').unique();
      table.string('phone_number');
      table.text('address');
      table.string('employment_info');
      table.decimal('monthly_income', 14, 2);
      table.timestamps(true, true);
    })
    .createTable('loans', (table) => {
      table.uuid('id').primary();
      table.uuid('borrower_id').references('id').inTable('users').notNullable();
      table.decimal('amount', 14, 2).notNullable();
      table.decimal('interest_rate', 5, 2).notNullable();
      table.integer('term_months').notNullable();
      table.enum('status', ['DRAFT', 'PENDING_VETTING', 'FUNDING', 'ACTIVE', 'COMPLETED', 'DEFAULTED']).notNullable().defaultTo('DRAFT');
      table.text('description');
      table.timestamps(true, true);
    })
    .createTable('investments', (table) => {
      table.uuid('id').primary();
      table.uuid('loan_id').references('id').inTable('loans').notNullable();
      table.uuid('lender_id').references('id').inTable('users').notNullable();
      table.decimal('amount', 14, 2).notNullable();
      table.enum('status', ['ACTIVE', 'CANCELLED', 'COMPLETED']).notNullable().defaultTo('ACTIVE');
      table.timestamps(true, true);
    })
    .createTable('repayments', (table) => {
      table.uuid('id').primary();
      table.uuid('loan_id').references('id').inTable('loans').notNullable();
      table.decimal('amount', 14, 2).notNullable();
      table.date('due_date').notNullable();
      table.enum('status', ['PENDING', 'PAID', 'OVERDUE']).notNullable().defaultTo('PENDING');
      table.timestamp('payment_date');
      table.timestamps(true, true);
    })
    .createTable('background_checks', (table) => {
      table.uuid('id').primary();
      table.uuid('user_id').references('id').inTable('users').notNullable();
      table.string('provider').notNullable();
      table.string('external_id');
      table.string('status').notNullable();
      table.jsonb('raw_result');
      table.integer('score');
      table.timestamps(true, true);
    })
    .createTable('transactions', (table) => {
      table.uuid('id').primary();
      table.uuid('user_id').references('id').inTable('users').notNullable();
      table.decimal('amount', 14, 2).notNullable();
      table.enum('type', ['DEPOSIT', 'WITHDRAWAL', 'FUNDING', 'REPAYMENT']).notNullable();
      table.enum('status', ['PENDING', 'COMPLETED', 'FAILED']).notNullable().defaultTo('PENDING');
      table.string('reference');
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('transactions')
    .dropTableIfExists('background_checks')
    .dropTableIfExists('repayments')
    .dropTableIfExists('investments')
    .dropTableIfExists('loans')
    .dropTableIfExists('profiles')
    .dropTableIfExists('users');
};
