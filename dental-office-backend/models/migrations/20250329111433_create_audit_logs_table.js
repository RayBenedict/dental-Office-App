/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('audit_logs', (table) => {
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
        table.string('action', 255).notNullable();
        table.text('details');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('audit_logs');
};
