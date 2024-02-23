const { Router } = require("express");
const UserRoute = require("./user");
const AccountRoute = require("./account");

const route = Router();

route.use("/user", UserRoute);
route.use("/account", AccountRoute);

module.exports = route;
