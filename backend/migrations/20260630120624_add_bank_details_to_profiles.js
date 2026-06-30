/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('profiles', table => {
    table.string('bank_name');
    table.string('bank_account_number');
    table.string('bank_account_type');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('profiles', table => {
    table.dropColumn('bank_name');
    table.dropColumn('bank_account_number');
    table.dropColumn('bank_account_type');
  });
};
