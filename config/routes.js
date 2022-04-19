const express = require('express');
const cors = require('cors');
const auth = require('../routes/auth');
const user = require('../routes/user');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.use(cors({
        origin: true
    }));
    app.use('/api/auth', auth);
    app.use('/api/user', user);
    app.use(error);
}