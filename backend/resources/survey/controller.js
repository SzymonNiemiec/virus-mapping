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
    },
    getLastUserSurvey: async (req, res, next) => {
        const { userId } = req.params
        try {
            const survey = await Survey.findOne({ user: userId }).sort({ date: -1 })
            res.status(200).send(survey)
        } catch (err) {
            next(err)
        }
    }
}
