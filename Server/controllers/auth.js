const firebase = require('../firebase.js');
const user = require('../models/User');
const errorHandler = require('../globals').errorHandler;

const register = async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.name) {
        res.status(400);
        res.send({
            email: 'email is required',
            password: 'password is required',
            name: 'name is required',
        });
    }
    await firebase
        .auth()
        .createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then(data => {
            // Add new user in db if created successfully
            const newUser = new user({
                email: data.user.email,
                name: req.body.name,
            });
            newUser
                .save()
                .then(result => {
                    res.send(data);
                })
                .catch(async error => {
                    currUser = firebase.auth().currentUser
                    currUser.delete().then(() => {
                        res.status(500).send({ error: error });
                    }).catch(error => { errorHandler(res) })
                    errorHandler(res);
                });
        })
        .catch(e => {
            res.status(500);
            res.send({ fireBaseError: e.message });
        });
};

const logIn = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400);
        res.send({
            email: 'email is required',
            password: 'password is required',
        });
    }
    await firebase
        .auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(data => {
            user.findOne({ email: req.body.email })
                .then(user => {
                    res.status(200).json({ ...data, ...user });
                })
                .catch(errorHandler(res));
        })
        .catch(e => {
            res.status(500);
            res.send({ fireBaseError: e.message });
        });
};

const verifyEmail = async (req, res) => {
    firebase
        .auth()
        .currentUser.sendEmailVerification()
        .than(function () {
            return res.status(200).json({ status: 'Email verification sent' });
        })
        .catch(error => res.status(500).json({ error: error.message }));
};

const resetPassword = async (req, res) => {
    if (!req.body.email) {
        res.send({
            email: 'email is required',
        });
    }
    await firebase
        .auth()
        .sendPasswordResetEmail(req.body.email)
        .then(data => {
            res.status(200);
            res.send('Password reset email was sent');
        })
        .catch(e => {
            res.status(500);
            res.send({ error: e.message });
        });
};

module.exports = {
    register,
    logIn,
    resetPassword,
};
