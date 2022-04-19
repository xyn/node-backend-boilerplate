const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate, authValidate} = require('../models/user');
const asyncMiddleware = require('../middleware/async');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', asyncMiddleware(async (req, res, next) => {
    const { error } = authValidate(req.body);
    if (error) return res.status(400).json({
        error: true, 
        message: error.details[0].message
    });
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({
        error: true, 
        message: "Invalid email."
    });        

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) {
        return res.status(400).json({
            error: true, 
            message: "Invalid password."
        });
    }
    const token = user.generateAuthToken();
    return res.status(200).json({
        error: false,
        message: token
    });
}));

router.post('/create', asyncMiddleware(async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({
        error: true, 
        message: error.details[0].message
    });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({
        error: true, 
        message: "This user is already registered."
    });

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();    
    
    const token = user.generateAuthToken();
    return res.status(200).json({
        error: false,
        message: token
    });
}));

module.exports = router;