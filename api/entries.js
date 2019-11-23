module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation
    const limit = 10 //usado para paginacao

    const save = async (req, res) => {
        const entry = { ...req.body }
        if (req.params.id) entry.id = req.params.id

        try {
            existsOrError(entry.date, 'Data não informada')
            existsOrError(entry.deliveryman, 'Entregador não informado')
            existsOrError(entry.receiver, 'Recebedor não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(entry.id) {
            app.db('entries')
                .update(entry)
                .where({ id: entry.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('entries')
                .insert(entry)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('entries').count('id').first()
        const count = parseInt(result.count)

        app.db('entries')
            .limit(limit).offset(page * limit - limit)
            .then(entries => res.json({ data: entries, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        app.db('entries')
            .where({ id: req.params.id })
            .first()
            .then(entry => res.json(entry))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }
}