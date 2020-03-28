const express = require('express')
const router = express.Router()
//const controller = require('./controller')

router.get('/', async (req,res) => {
    res.status(200).send('user ok')
})

module.exports = router