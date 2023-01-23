const jwt = require('jsonwebtoken');
const privateKey = require('./privateKey.json');

function signJwt(email) {
    var token = jwt.sign({
        email
      }, privateKey.key, {expiresIn: '2 days'});
    return token;
}

module.exports = { signJwt };