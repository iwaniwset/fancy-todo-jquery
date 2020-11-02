const bcrypt = require('bcryptjs');

function hashPass(password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt)
}

function comparePass(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}
module.exports = {
    hashPass,
    comparePass
}