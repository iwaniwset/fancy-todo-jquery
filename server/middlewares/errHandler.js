function errHandler(err, req, res, next) {
    console.log(err, '<<<<<<<< ini dari error handler');
    let errors = []
    let statusCode = 500


    switch (err.name) {
        case 'JsonWebTokenError':
        case 'AuthenticationFailed':
            errors.push('Please Login First')
            statusCode = 401

            break;
        case 'SequelizeUniqueConstraintError':
            errors.push("email is already exists")

            statusCode = 400
            break;
        case 'SequelizeValidationError':
            err.errors.forEach(element => {
                errors.push(element.message)
            });
            statusCode = 400
            break;
        default:
            errors.push(err.msg || 'internal server error')
            statusCode = err.statusCode || 500
    }


    res.status(statusCode).json({
        errors: errors
    })


}
module.exports = errHandler