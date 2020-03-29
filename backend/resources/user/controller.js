const User = require('./model')
const illnessService = require('../../services/illnessService')
const crudControllers = require('../../utils/crud')

module.exports = {
    ...crudControllers(User),

    getUserAndFriends: async (req, res, next) => {
        const { id } = req.params
        try {
            const user = await User.findById(id).populate('friends', "-friends")
            res.status(200).send(user)
        } catch (err) {
            next(err)
        }
    },

    addFriends: async (req, res, next) => {
        const { id } = req.params
        try {
            const updatedUser = await User.updateOne({ _id: id }, { $push: { friends: req.body }})
            res.status(200).send(updatedUser)
        } catch (err) {
            next(err)
        }
    },

    addIllness: async (req, res, next) => {
        const { id } = req.params
        try {
            await User.updateOne({ _id: id }, { $push: { illnesses: req.body }})
            const warnedUsers = await illnessService.sendAlerts(req.body, id)
            res.status(200).send(warnedUsers)
        } catch (err) {
            next(err)
        }
    }
}
