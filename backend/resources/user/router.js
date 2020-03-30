const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.post('/', controller.createOne)

router.get('/:id', controller.getOne)

router.get('/:id/friends', controller.getUserAndFriends)

router.patch('/:id', controller.updateOne)

router.patch('/:id/friends', controller.addFriends)

router.patch('/:id/illness', controller.addIllness)

router.delete('/:id', controller.removeOne)


router.post('/login', controller.authenticate)
router.post('/register', controller.register)
router.get('/token', controller.getOneFromToken)

module.exports = router
