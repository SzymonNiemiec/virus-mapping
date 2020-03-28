const User = require('./model')
const crudControllers = require('../../utils/crud')

module.exports = {
    ...crudControllers(User)
}
