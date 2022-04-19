const winston = require('winston');

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);
    return res.status(500).json({
        error: true,
        message: err.message
    });
}