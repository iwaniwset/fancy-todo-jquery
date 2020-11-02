const {
    Todo
} = require('../models/index')

function authorization(req, res, next) {
    let {
        id
    } = req.params
    Todo.findByPk(id)
        .then(todo => {
            if (!todo) throw {
                msg: "Todo Not Found",
                statusCode: 404
            };
            else if (todo.UserId === req.userData.id) next()
            else throw {
                msg: "you're not authorize", //punya kak iam di samamin namenya sama auth terus di push
                //tanyakan kak arnold di bedain boleh ngga
                statusCode: 401
            }
        })
        .catch(err => {
            // res.status(500).json({
            //     error: err.msg || "internal server error"
            // })
            next(err)
        })
}
module.exports = authorization