exports.up = function(knex) {
    return knex.schema.createTable('productentries', table => {
        table.increments('id').primary()
        table.integer('entryId').references('id')
            .inTable('entries').notNull()
        table.integer('productId').references('id')
            .inTable('products').notNull()
        table.integer('quantity').notNull().defaultTo(1)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('productentries')
};