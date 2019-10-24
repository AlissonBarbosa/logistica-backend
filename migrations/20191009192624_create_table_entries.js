exports.up = function(knex) {
    return knex.schema.createTable('entries', table => {
        table.increments('id').primary()
        table.datetime('date').notNull()
        table.string('deliveryman').notNull()
        table.string('receiver').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('entries')
};