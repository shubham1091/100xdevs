const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

console.log(process.env.DB_URL);
mongoose.connect(process.env.DB_URL);

const User = mongoose.model("Users", {
    name: String,
    email: String,
    password: String,
});

app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({ email });
    // console.log(existingUser);

    if (existingUser) {
        return res.status(400).send("User already exists");
    }

    const user = new User({ name, email, password });

    // console.log(user);

    user.save();
    res.json({
        msg: "User created successfully",
    });
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const usr = await User.findOne({ email: email, password: password });

    if (!usr) {
        return res.status(400).send("Invalid credentials");
    }else{
        return res.status(200).send("you are logged in");
    }
})

app.listen(3000, () => {
    console.log(`listening on 3000`);
});
