const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    usertype: {
        type: String,
        default: 'user',
    },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;