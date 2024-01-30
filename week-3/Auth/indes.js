const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "harkirat singh",
    },
    {
        username: "raman@gmail.com",
        password: "123321",
        name: "Raman singh",
    },
    {
        username: "priya@gmail.com",
        password: "123456",
        name: "Priya kumari",
    },
];

function userExists(username, password) {
    let us = ALL_USERS.find((user) => {
        return user.username === username && user.password === password;
    });
    return us !== undefined;
}

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User dosent exist in our in memory db",
        });
    }
    let token = jwt.sign({ username }, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const users = ALL_USERS.filter(
            (usr) => usr.username !== decoded.username
        ).map((usr) => usr.name);
        res.json({
            users,
        });
    } catch (err) {
        return res.status(403).json({
            msg: "invalid token",
        });
    }
});

app.listen(3000, () => {
    console.log(`listening on 3000`);
});
