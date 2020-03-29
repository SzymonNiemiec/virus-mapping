const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.post('/', controller.createOne)

router.get('/:id', controller.getOne)

router.get('/user/:userId', controller.getMeetings)

router.patch('/:id', controller.updateOne)

router.patch('/user/:userId', controller.addMeetings)

router.delete('/:id', controller.removeOne)

module.exports = router
