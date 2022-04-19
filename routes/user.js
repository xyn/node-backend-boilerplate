const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/async');

router.get('/', auth, asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -__v");
    res.status(200).json({
        error:  false,
        message: user
    });
}));

module.exports = router;