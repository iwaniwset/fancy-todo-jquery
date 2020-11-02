const {
    User
} = require('../models/index')
const {
    OAuth2Client
} = require('google-auth-library');
const {
    comparePass
} = require('../helpers/bcrypt')
const {
    generateToken
} = require('../helpers/jwt')
const user = require('../models/user')
const {
    use
} = require('../routes')
class Controller {
    static register(req, res, next) {
        let {
            email,
            password
        } = req.body
        User.create({
                email,
                password
            })
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    email: data.email,
                    msg: "register success"
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static login(req, res, next) {
        const {
            email,
            password
        } = req.body
        User.findOne({
                where: {
                    email
                }
            })
            .then(user => {
                if (!user) throw {
                    msg: "invalid email or password",
                    statusCode: 400
                };
                let comparePassword = comparePass(password, user.password)
                if (!comparePassword) throw {
                    msg: "invalid email or password",
                    statusCode: 400
                };
                let payload = {
                    id: user.id,
                    email: user.email
                }
                let token = generateToken(payload)
                res.status(200).json({
                    token
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static loginGoogle(req, res, next) {
        let email = null
        // console.log(req.body.tokenGoogle, '<<<<<<< dari token google');
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
                idToken: req.body.tokenGoogle,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                let payload = ticket.getPayload()
                email = payload.email

                return User.findOne({
                    where: {
                        email
                    }
                })
            })
            .then(user => {
                if (user) return user
                else {
                    return User.create({
                        email: email,
                        password: 'googlePassword'
                    })
                }
            })
            .then(user => {
                let newPalyload = {
                    email: user.email,
                    id: user.id
                }
                let token = generateToken(newPalyload)
                res.status(200).json({
                    token
                })
            })
            .catch(err => next(err))

    }
}
module.exports = Controller