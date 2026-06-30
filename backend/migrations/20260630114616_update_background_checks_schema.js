/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .alterTable('background_checks', (table) => {
      table.decimal('max_loan_amount', 14, 2);
    })
    .alterTable('profiles', (table) => {
      table.decimal('max_loan_amount', 14, 2).defaultTo(0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('profiles', (table) => {
      table.dropColumn('max_loan_amount');
    })
    .alterTable('background_checks', (table) => {
      table.dropColumn('max_loan_amount');
    });
};
