const jwt = require("jsonwebtoken");

//create auth middleware
const checkAuth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            message: 'Auth failed1'
        });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Auth failed2'
            });
        }
        req.userId = decoded.userId;
        next();
    });
}
module.exports = checkAuth;