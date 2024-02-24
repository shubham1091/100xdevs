const { Router } = require("express");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middleware/auth");
const { SignInUser, createUser, UpdateUser } = require("../types");

const route = Router();

route.post("/signup", async (req, res) => {
    try {
        const body = req.body;
        // console.log(req.body);
        const { success } = createUser.safeParse(body);

        if (!success) {
            res.status(400).json({
                message: "Incorrect inputs",
            });
            return;
        }

        const existingUser = await User.findOne({ username: body.username });

        if (existingUser) {
            res.status(409).json({
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
            JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.json({
            message: "User created successfully",
            token,
        });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

route.post("/signin", async (req, res) => {
    try {
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
        });

        if (!user || !(await user.comparePassword(body.password))) {
            res.status(401).json({
                message: "Invalid username or password",
            });
            return;
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.json({
            token,
        });
    } catch (error) {
        console.error("Error in signin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

route.put("/", authMiddleware, async (req, res) => {
    try {
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
    } catch (err) {
        console.error("Error in updating user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

route.get("/bulk", authMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const currentUser = req.userId;

        const users = await User.find({
            $and: [
                {
                    _id: { $ne: currentUser }, // Exclude current user by ID
                },
                {
                    $or: [
                        { firstName: { $regex: filter } },
                        { lastName: { $regex: filter } },
                    ],
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
    } catch (error) {
        console.error("Error in fetching users: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

route.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }

        res.json({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } catch (error) {
        console.error("Error in fetching current user: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = route;
