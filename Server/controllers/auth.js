const firebase = require('../firebase.js')

const signUp = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                email: "email is required",
                password: "password is required"
            })
        }
        const data = await firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

const signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                email: "email is required",
                password: "password is required"
            })
        }
        const data = await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    };
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
    try {
        if (!req.body.email) {
            return res.status(400).json({
                email: "email is required"
            })
        }
        const data = await firebase.auth().sendPasswordResetEmail(req.body.email)
        return res.status(200).json("email was sent")
    } catch (error) {
        return res.status(500).json({ error: error.message })
    };
};

module.exports = {
    signUp,
    signIn,
    resetPassword
};
