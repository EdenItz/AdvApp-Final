const jwt = require('jsonwebtoken');
const privateKey = require('../helpers/privateKey.json');

module.exports = (req, res, next) => {
    try {
        // get the token from headers
        let token = req.header('Authorization');
        if (!token) return res.status(401).send('No token was provided');

        // Checking the token
        const payload = jwt.verify(token, privateKey.key);

        // save to payload
        req.payload = payload;

        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            res.clearCookie("eStoreToken");
            res.status(401).send("Token is expired, please log in again");
        } else {
            res.status(400).send(err);
        }
    }
};
