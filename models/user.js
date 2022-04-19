const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET_TOKEN);
}
const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    })
    return schema.validate(user);
}

function authValidateUser(req) {
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    })
    return schema.validate(req);
}

exports.User = User;
exports.validate = validateUser;
exports.authValidate = authValidateUser;