exports.up = async function(knex) {
    await knex.schema
    .createTable('cars', table => {
        table.increments()
        table.text('vin', 255).unique().notNullable()
        table.text('make', 255).notNullable()
        table.text('model', 255).notNullable()
        table.decimal('mileage').notNullable()
        table.text('title', 255)
        table.text('transmission', 255)
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('cars')
}