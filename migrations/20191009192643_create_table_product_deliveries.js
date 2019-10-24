exports.up = function(knex) {
    return knex.schema.createTable('productdeliveries', table => {
        table.increments('id').primary()
        table.integer('deliveryId').references('id')
            .inTable('deliveries').notNull()
        table.integer('productId').references('id')
            .inTable('products').notNull()
        table.integer('quantity').notNull().defaultTo(1)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('productdeliveries')
};