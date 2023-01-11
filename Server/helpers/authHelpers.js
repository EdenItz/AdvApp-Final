const jwt = require('jsonwebtoken');

function getToken(req) {
    // get the token from headers
    let token = req.header('Sec-WebSocket-Key');
    return token;
}

module.exports = {getToken};
