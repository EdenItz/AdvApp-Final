const jwt = require('jsonwebtoken');

function getToken(req) {
    // get the token from headers
    let token = req.cookies.eShopUserID;
    return token;
}

module.exports = {getToken};
