const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    creditBalance: {
        type: Number,
        default: 3
    },
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;