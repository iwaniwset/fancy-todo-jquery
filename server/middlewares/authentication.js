const {
    User
} = require('../models/index')
const {
    verifyToken
} = require('../helpers/jwt')


async function authentication(req, res, next) {
    try {
        let {
            token
        } = req.headers
        let decoded = verifyToken(token)
        console.log(decoded, "<<<<<<<<<<<<<<<<<<<<< Ini Decode");
        let user = await User.findOne({
            where: {
                email: decoded.email
            }
        })
        if (!user) throw {
            name: "AuthenticationFailed"
        }
        req.userData = decoded
        next()

    } catch (err) {
        // console.log(err, "error authentication");
        // res.status(500).json({
        //     error: err.msg || "internal server error"
        // })
        next(err)
    }
}

module.exports = authentication