const express = require('express')
const { json, urlencoded } = require('body-parser') 
const morgan = require('morgan')
const config = require('./utils/config')
const cors = require('cors')
const { connect } = require('./utils/db')
const jwt = require('./middlewares/jwt')


const userRouter = require('./resources/user/router')
const userMeetingRouter = require('./resources/userMeeting/router')
const surveyRouter = require('./resources/survey/router')

const app = express()

var whitelist = ['https://virusmaping.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.disable('x-powered-by')

app.use(cors(corsOptions))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(jwt())
app.use('/api/user', userRouter)
app.use('/api/usermeeting', userMeetingRouter)
app.use('/api/survey', surveyRouter)

const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API listen on http://localhost:${config.port}`)
    })
  } catch (e) {
    console.error(e)
  }
}

start()