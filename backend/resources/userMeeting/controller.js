const UserMeetings = require('./model')
const crudControllers = require('../../utils/crud')

module.exports = {
    ...crudControllers(UserMeetings),

    getMeetings: async (req, res, next) => {
        const { userId } = req.params
        try {
            const userMeetings = await UserMeetings.findOne({ user: userId }).exec()
            res.status(200).send(userMeetings.meetings)
        } catch (err) {
            next(err)
        }
    },
    addMeetings: async (req, res, next) => {
        const { userId } = req.params
        try {
            const updatedUserMeetings = await UserMeetings.updateOne({ user: userId }, { $push: { meetings: req.body }})
            res.status(200).send(updatedUserMeetings)
        } catch (err) {
            next(err)
        }
    }
}
