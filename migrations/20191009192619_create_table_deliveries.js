exports.up = function(knex) {
    return knex.schema.createTable('deliveries', table => {
        table.increments('id').primary()
        table.datetime('date').notNull()
        table.string('deliveryman').notNull()
        table.string('receiver').notNull()
        table.integer('departmentId').references('id')
            .inTable('departments').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('deliveries')
};