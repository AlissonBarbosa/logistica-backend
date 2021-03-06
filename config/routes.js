module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
    
    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/secretariats')
        .post(app.api.secretary.save)
        .get(app.api.secretary.get)
    
    app.route('/secretariats/:id')
        .put(app.api.secretary.save)
        .get(app.api.secretary.getById)
    
    app.route('/products')
        .post(app.api.product.save)
        .get(app.api.product.get)
    
    app.route('/products/:id')
        .put(app.api.product.save)
        .get(app.api.product.getById)

    app.route('/departments')
        .post(app.api.department.save)
        .get(app.api.department.get)
    
    app.route('/departments/:id')
        .put(app.api.department.save)
        .get(app.api.department.getById)
        .delete(app.api.department.remove)

    app.route('/entries')
        .post(app.api.entries.save)
        .get(app.api.entries.get)
    
    app.route('/entries/:id')
        .put(app.api.entries.save)
        .get(app.api.entries.getById)
    
    app.route('/productentrie/')
        .get(app.api.productEntries.get)
        .post(app.api.productEntries.save)
}