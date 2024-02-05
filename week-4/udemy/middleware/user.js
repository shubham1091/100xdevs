require("dotenv").config();
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = auth.split(" ")[1];
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedValue.username) {
        req.username = decodedValue.username;
        next();
    } else {
        res.status(403).json({
            msg: "You are not authenticated",
        });
    }
}

module.exports = userMiddleware;
