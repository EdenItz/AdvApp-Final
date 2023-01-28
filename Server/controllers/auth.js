const firebase = require('../firebase.js');
const User = require('../models/User');
const errorHandler = require('../globals').errorHandler;
const { signJwt } = require('../helpers/jwtHandlers');
const jwt = require('jsonwebtoken');

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
            const newUser = new User({
                email: data.user.email,
                name: req.body.name,
            });
            newUser
                .save()
                .then(result => {
                    res.send(data);
                })
                .catch(async error => {
                    currUser = firebase.auth().currentUser;
                    currUser
                        .delete()
                        .then(() => {
                            res.status(500).send({ error: error });
                        })
                        .catch(error => {
                            errorHandler(res);
                        });
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

    try {
        const data = await firebase
            .auth()
            .signInWithEmailAndPassword(req.body.email, req.body.password);

        if (data) {
            const token = signJwt(req.body.email);
            // set cookie to client
            res.cookie('eShopToken', token, { maxAge: 3600 * 1000 });
            res.cookie('eShopUserID', firebase.auth().currentUser.uid, {
                maxAge: 3600 * 1000,
            });

            res.status(200);
            res.send('Password reset email was sent');
        } else {
            res.status(500);
            res.send({ fireBaseError: e.message });
        }
    } catch (e) {
        res.status(500);
        res.send({ fireBaseError: e.message });
    }
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
