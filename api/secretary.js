module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation
    const limit = 10 //usado para paginacao

    const save = async (req, res) => {
        const secretary = { ...req.body }
        if(req.params.id) secretary.id = req.params.id

        try {
            existsOrError(secretary.name, 'Nome não informado')
            existsOrError(secretary.initial, 'Sigla não informada')

            const secretaryFromDBName = await app.db('secretariats')
                .where({ name: secretary.name }).first()
            if(!secretary.id) {
                notExistsOrError(secretaryFromDBName, 'Secretaria já cadastrada com esse nome')
            }

            const secretaryFromDBInitial = await app.db('secretariats')
                .where({ initial: secretary.initial }).first()
            if(!secretary.id) {
                notExistsOrError(secretaryFromDBInitial, 'Secretaria já cadastrada com essa sigla')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(secretary.id) {
            app.db('secretariats')
                .update(secretary)
                .where({ id: secretary.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('secretariats')
                .insert(secretary)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('secretariats').count('id').first()
        const count = parseInt(result.count)

        app.db('secretariats')
            .select('id', 'name', 'initial')
            .limit(limit).offset(page * limit - limit)
            .whereNull('deletedAt')
            .then(secretariats => res.json({ data: secretariats, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        app.db('secretariats')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(secretary => res.json(secretary))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('secretariats')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Secretaria não encontrada')
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}