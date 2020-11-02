const {
    Todo
} = require('../models/index');
const todo = require('../models/todo');

class Controller {
    static findAll(req, res, next) {
        Todo.findAll({
                where: {
                    UserId: req.userData.id
                },
                order: [
                    ['id', 'ASC']
                ]
            })
            .then(todos => {
                res.status(200).json({
                    status: 200,
                    msg: "Success Find ALl",
                    todos
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static create(req, res, next) {
        // console.log(req.body, 'INI DARI CONTROLLER')
        const {
            title,
            description,
            due_date
        } = req.body
        Todo.create({
                title,
                description,
                due_date,
                UserId: req.userData.id
            })
            .then(todo => {
                res.status(201).json({
                    todo
                })
            })
            .catch(err => {
                // console.log(err, 'ERROR Create Todos');
                // res.status(500).json({
                //     err
                // })
                next(err)
            })
    }

    static update(req, res, next) {
        const {
            id
        } = req.params
        const {
            title,
            description,
            status,
            due_date
        } = req.body
        Todo.findByPk(id)
            .then(todo => {
                if (!todo) throw {
                    status: 404,
                    msg: 'Todo Not Found'
                }
                return todo.update({
                    title,
                    description,
                    status,
                    due_date
                })
            })
            .then(todo => {
                res.status(200).json({
                    status: 200,
                    msg: "Todo id updated",
                    todo
                })
            })
            .catch(err => {
                // console.log(err, 'update error');
                // res.status(500).json({
                //     err: err.msg || 'Internal Server Error'
                // })
                next(err)
            })
    }


    static delete(req, res, next) {
        const {
            id
        } = req.params
        Todo.findByPk(id)
            .then(todo => {
                if (!todo) throw {
                    msg: 'Todo not Found'
                }
                todo.destroy()
                res.status(200).json({
                    todo
                })
            })
            .catch(err => {
                // console.log(err);
                // res.status(500).json({
                //     err: err.msg || 'internal server error'
                // })
                next(err)
            })
    }


}
module.exports = Controller