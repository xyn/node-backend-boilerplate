
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({
        error: true,
        message: "No token provided."
    })
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).json({
            error: true,
            message: "Invalid token."
        })
    }
}