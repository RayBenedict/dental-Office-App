/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('appointments', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('dentist_id').notNullable().references('id').inTable('dentists').onDelete('CASCADE');
        table.timestamp('appointment_date').notNullable();
        table.string('status', 20).defaultTo('scheduled');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.unique(['dentist_id', 'appointment_date']);
    });

    // Add the CHECK constraint for the 'status' column
    await knex.raw(`
        ALTER TABLE appointments
        ADD CONSTRAINT status_check
        CHECK (status IN ('scheduled', 'completed', 'canceled'))
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('appointments');
};