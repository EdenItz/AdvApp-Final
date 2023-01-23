const firebase = require('../firebase.js');
const { signJwt } = require('../helpers/jwtHandlers');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const register = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400)
        res.send({
            email: "email is required",
            password: "password is required"
        })
    }
    const data = await firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then((data) => {
            res.status(200)
            res.send(data)
        }).catch((e) => {
            res.status(500)
            res.send({ error: e.message })
        })
};

const logIn = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400)
        res.send({
            email: "email is required",
            password: "password is required"
        })
    }
    const data = await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(async (data) => {
        const token = signJwt(req.body.email);
        // User.insertMany({...req.body, createdOn: new Date().getTime().toString()});
        res.cookie('eShopToken', token, { maxAge: 3600 * 1000 });
        res.status(200)
        res.send(data);
    }).catch((e) => {
            res.status(500)
            res.send({ error: e.message })
        })
}

const verifyEmail = async (req, res) => {
    firebase
        .auth().currentUser
        .sendEmailVerification()
        .than(function () {
            return res.status(200).json({ status: 'Email verification sent' })
        }).catch((error) => res.status(500).json({ error: error.message }))
};

const resetPassword = async (req, res) => {
    if (!req.body.email) {
        res.send({
            email: "email is required",
        })
    }
    await firebase.auth().sendPasswordResetEmail(req.body.email).then((data) => {
        res.status(200)
        res.send("Password reset email was sent")
    }).catch((e) => {
        res.status(500)
        res.send({ error: e.message })
    })
}

module.exports = {
    register,
    logIn,
    resetPassword
};