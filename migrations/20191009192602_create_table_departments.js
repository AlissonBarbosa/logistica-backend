exports.up = function(knex) {
    return knex.schema.createTable('departments', table => {
        table.increments('id').primary()
        table.string('name', 1000).notNull()
        table.integer('secretaryId').references('id')
            .inTable('secretariats').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('departments')
};