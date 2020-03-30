const User = require('./model')
const illnessService = require('../../services/illnessService')
const crudControllers = require('../../utils/crud')
const config = require('../../utils/config')
const bcrypt = require('bcrypt')
const emailService = require('../../services/emailService')
const jwt = require('jsonwebtoken')

const makeid = length => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

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
    },
    authenticate: async (req, res, next) => {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            console.log(user)
            if (user && bcrypt.compareSync(password, user.passwordHash)) {
                const { passwordHash, ...userWithoutHash } = user.toObject()
                const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '10h' })
                res.status(200).send({ user: userWithoutHash, token: token })
            } else {
                res.status(400).send({ message: 'Username or password is incorrect' })
            }
        } catch (err) {
            next(err)
        }
    },
    getOneFromToken: async (req, res, next) => {
        const query = User.findOne({ _id: req.user.sub }).select('-hash')
        const result = await query.exec()
        res.status(200).send(result)
    },

    register: async (req, res, next) => {
        const { email, name } = req.body
        let hash
        try {
            if (await User.findOne({ email })) {
                throw new Error(`Email ${email} jest zajęty`)
            }
            const password = makeid(10)
            if (password) {
                hash = bcrypt.hashSync(password, 10)
            }
            const user = new User({
                email: email,
                passwordHash: hash,
                name: name,
                registered: true,
            })
            const newUser = await user.save()
            const userMailOptions = {
                to: email,
                subject: `Your Registration in virusmaping`,
                text: `Password : ${password}`
              };
              await emailService.sendEmail(userMailOptions);
            newUser.passwordHash = undefined
            res.status(200).send({ message: "User Created", data: newUser })
        } catch (err) {
            next(err)
        }
    },
}
