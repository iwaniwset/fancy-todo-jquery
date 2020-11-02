const router = require('express').Router()
const Controller = require('../controller/userController')
const {
    route
} = require('./todosRoute')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/google-sign', Controller.loginGoogle)


module.exports = router