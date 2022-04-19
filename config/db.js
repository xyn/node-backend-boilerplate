require('dotenv').config();
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
        mongoose.connect('mongodb://localhost:27017/<db_name>')
                .then(() => winston.info('Connected to MongoDB'))
                .catch((err) => winston.error(err))
}
