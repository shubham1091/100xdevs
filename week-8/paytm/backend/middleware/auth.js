const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function autMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const token = authHeader.split(" ")[1];

    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);
        req.userId = decodedValue.userId;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.status(401).json({ message: "Token expired" });
            return;
        }
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = autMiddleware;
