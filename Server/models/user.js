const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 6,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    createdOn: {
        type: String,
    },
});

const User = mongoose.model('users', userSchema);
module.exports = User;
