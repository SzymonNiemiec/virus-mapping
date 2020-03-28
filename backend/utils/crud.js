const createOne = model => async (req, res, next) => {
    try {
        const doc = await model.create({ ...req.body })
        res.status(201).json(doc)
    } catch (err) {
        console.error(err)
        next(err)
    }
}

const getOne = model => async (req, res, next) => {
    try {
        const doc = await model
            .findOne({ _id: req.params.id })
            .lean()
            .exec()

        if (!doc) {
            return res.status(400).end()
        }

        res.status(200).json(doc)
    } catch (err) {
        console.error(err)
        next(err)
    }
}

const updateOne = model => async (req, res, next) => {
    try {
        const updatedDoc = await model
            .findOneAndUpdate(
                {
                    _id: req.params.id
                },
                req.body,
                { new: true }
            )
            .lean()
            .exec()

        if (!updatedDoc) {
            return res.status(400).end()
        }
        res.status(200).json(updatedDoc)
    } catch (err) {
        console.error(err)
        next(err)
    }
}

const removeOne = model => async (req, res, next) => {
    try {
        const removed = await model.findOneAndRemove({
            _id: req.params.id
        })
        if (!removed) {
            return res.status(400).end()
        }
        return res.status(204).end()
    } catch (err) {
        console.error(err)
        next(err)
    }
}

const crudControllers = model => ({
    createOne: createOne(model),
    getOne: getOne(model),
    updateOne: updateOne(model),
    removeOne: removeOne(model)
})

module.exports = crudControllers