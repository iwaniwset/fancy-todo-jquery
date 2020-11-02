const router = require('express').Router()
const Controller = require('../controller/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', Controller.findAll)
router.post('/', Controller.create)
router.delete('/:id', authorization, Controller.delete)
router.put('/:id', authorization, Controller.update)

module.exports = router