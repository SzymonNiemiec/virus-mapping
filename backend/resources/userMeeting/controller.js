const UserMeeting = require('./model')
const crudControllers = require('../../utils/crud')

module.exports = {
    ...crudControllers(UserMeeting)
}
