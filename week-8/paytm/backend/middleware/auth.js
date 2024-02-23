const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function autMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("bearer ")) {
        return res.status(401).json({});
    }
    const token = auth.split(" ")[1];

    const decodedValue = jwt.verify(token, JWT_SECRET);

    if (decodedValue.userId) {
        req.userId = decodedValue.userId;
        next();
    } else {
        res.status(403).json({
            msg: "You are not authenticated",
        });
        return;
    }
}

module.exports = autMiddleware;
