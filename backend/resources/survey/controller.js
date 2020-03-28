const Survey = require('./model')
const crudControllers = require('../../utils/crud')

module.exports = {
    ...crudControllers(Survey)
}
