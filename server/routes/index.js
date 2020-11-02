const router = require('express').Router()
const todosRoute = require('./todosRoute')
const userRoute = require('./userRoute')

router.get('/', (req, res) => res.json({
    msg: "Welcome Funcy Todo"
}))

router.use('/users', userRoute)
router.use('/todos', todosRoute)

module.exports = router