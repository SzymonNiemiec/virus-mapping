const Survey = require('./model')
const crudControllers = require('../../utils/crud')

module.exports = {
    ...crudControllers(Survey),

    getManyByUserId: async (req, res, next) => {
        const { userId } = req.params
        try {
            const surveys = await Survey.find({ user: userId })
            res.status(200).send(surveys)
        } catch (err) {
            next(err)
        }
    }
}
