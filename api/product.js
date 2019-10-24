module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const product = { ...req.body }
        if (req.params.id) product.id = req.params.id

        try {
            existsOrError(product.description, 'Descrição não informada')

            const productFromDB = await app.db('products')
                .where({ description: product.description }).first()
            if(product.id) {
                notExistsOrError(productFromDB, 'Produto já cadastrado com essa descrição')
            }

        }catch (msg) {
            return res.status(400).send(msg)
        }

        if(product.id) {
            app.db('products')
                .update(product)
                .where({ id: product.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('products')
                .insert(product)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('products').count('id').first()
        const count = parseInt(result.count)

        app.db('products')
            .limit(limit).offset(page * limit - limit)
            .then(products => res.json({ data: products, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        app.db('products')
            .where({ id: req.params.id })
            .first()
            .then(product => res.json(product))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }
}