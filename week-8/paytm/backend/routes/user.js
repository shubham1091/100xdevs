const { Router } = require("express");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middleware/auth");
const { SignInUser, createUser, UpdateUser } = require("../types");

const route = Router();

route.post("/signup", async (req, res) => {
    const body = req.body;
    // console.log(req.body);
    const { success } = createUser.safeParse(body);

    if (!success) {
        res.status(411).json({
            message: "Incorrect inputs",
        });
        return;
    }

    const exist = await User.findOne({ username: body.username });

    if (exist) {
        res.status(411).json({
            message: "Email already taken",
        });
        return;
    }

    const user = await User.create(body);

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 1000,
    });

    const token = jwt.sign(
        {
            userId,
        },
        JWT_SECRET
    );

    res.json({
        message: "User created successfully",
        token: token,
    });
});

route.post("/signin", async (req, res) => {
    const body = req.body;

    const { success } = SignInUser.safeParse(body);
    if (!success) {
        res.status(411).json({
            message: "Incorrect inputs",
        });
        return;
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password,
    });

    if (!user) {
        res.status(411).json({
            message: "Error while logging in",
        });
        return;
    }

    const token = jwt.sign(
        {
            userId: user._id,
        },
        JWT_SECRET
    );

    res.json({
        token: token,
    });
});

route.put("/", authMiddleware, async (req, res) => {
    const body = req.body;

    const { success } = UpdateUser.safeParse(body);

    if (!success) {
        res.status(411).json({
            message: "Incorrect inputs",
        });
        return;
    }

    await User.findByIdAndUpdate(req.userId, body);

    res.json({
        message: "User updated successfully",
    });
});

route.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: filter,
                },
            },
            {
                lastName: {
                    $regex: filter,
                },
            },
        ],
    });

    res.json({
        users: users.map((user) => ({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
        })),
    });
});

module.exports = route;
