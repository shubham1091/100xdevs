const { Router } = require("express");
const UserRoute = require("./user");
const AccountRoute = require("./account");
const PasswordRoute = require("./password");

const route = Router();

route.use("/user", UserRoute);
route.use("/account", AccountRoute);
route.use('/password', PasswordRoute);

route.use((err, req, res, next) => {
    console.error("Error: ", err);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = route;
