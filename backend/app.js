const express = require('express')
const { json, urlencoded } = require('body-parser') 
const morgan = require('morgan')
const config = require('./utils/config')
const cors = require('cors')
const { connect } = require('./utils/db')

const userRouter = require('./resources/user/router')
const userMeetingRouter = require('./resources/userMeeting/router')
const surveyRouter = require('./resources/survey/router')

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

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