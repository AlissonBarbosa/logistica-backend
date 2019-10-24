exports.up = function(knex) {
    return knex.schema.createTable('secretariats', table => {
        table.increments('id').primary()
        table.string('name', 1000).notNull()
        table.string('initial').notNull()
        table.timestamp('deletedAt')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('secretariats')
};
