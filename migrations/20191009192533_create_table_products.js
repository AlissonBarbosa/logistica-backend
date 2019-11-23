exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary()
        table.string('description').notNull()
        table.string('make')
        table.string('model')
        table.integer('quantity').notNull().defaultTo(0)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products')
};
