module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation
    const limit = 10 //usado para paginacao

    const save = async (req, res) => {
        const productEntrie = { ...req.body }
        for(let val of productEntrie.productEntrie) {
            console.log(val)
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('productentries').count('id').first()
        const count = parseInt(result.count)

        app.db('productentries')
            .limit(limit).offset(page * limit - limit)
            .then(productEntrie => res.json({ data: productEntrie, count, limit}))
            .catch(err => res.status(500).send(err))
    }

    return { save, get }
}