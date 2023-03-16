const express = require('express')
const Controller = require('./controller')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/users', Controller.createUser)
router.get('/users', Controller.getUsers)
router.get('/users/:user_id', Controller.getUser)
router.post('/users/login', Controller.login)
router.delete('/users/:user_id', auth, Controller.deleteUser)

module.exports = router