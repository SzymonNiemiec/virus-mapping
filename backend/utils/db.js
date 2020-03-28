
const mongoose = require('mongoose')
const config = require ('./config')

const connect = async (url = config.dbUrl, opts = {}) => {
  return await mongoose.connect(
    url,
    { ...opts, useNewUrlParser: true, useUnifiedTopology: true}
  )
}

exports.connect = connect