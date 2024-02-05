const jwt = require("jsonwebtoken");
const { Admin } = require("../db");
require("dotenv").config();

// Middleware for handling auth
// async function adminMiddleware(req, res, next) {
//     // Implement admin auth logic
//     // You need to check the headers and validate the admin from the admin DB.
//     const username = req.headers.username;
//     const password = req.headers.password;

//     try {
//         const admin = await Admin.findOne({ username, password });
//         if (admin) {
//             req.adminId = admin._id; // Set adminId in request object
//             next();
//         } else {
//             res.status(403).json({ message: "Admin doesn't exist" });
//         }
//     } catch (error) {
//         console.error("Error in adminMiddleware:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }

async function adminMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.username) {
        const admin = await Admin.findOne({ username: decoded.username });
        req.adminId = admin._id;
        next();
    } else {
        res.status(403).json({ message: "invalid credentials" });
    }
}

module.exports = adminMiddleware;
