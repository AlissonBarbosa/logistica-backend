module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const department = { ...req.body }
        if(req.params.id) department.id = req.params.id

        try {
            existsOrError(department.name, 'Nome não informado')
            existsOrError(department.secretaryId, 'Secretaria não informada')

            const departmentFromDB = await app.db('departments')
                .where({ secretaryId: department.secretaryId }).first()
            if(department.id) {
                notExistsOrError(departmentFromDB, 'Departamento já cadastrado')
            }
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(department.id) {
            app.db('departments')
                .update(department)
                .where({ id: department.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('departments')
                .insert(department)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('departments').count('id').first()
        const count = parseInt(result.count)

        app.db('departments')
            .select('id', 'name', 'secretaryId')
            .limit(limit).offset(page * limit - limit)
            .then(departments => res.json({ data: departments, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        app.db('departments')
            .where({ id: req.params.id })
            .first()
            .then(department => res.json(department))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }
}