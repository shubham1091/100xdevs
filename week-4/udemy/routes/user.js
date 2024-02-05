const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
require("dotenv").config();
const jwt = require("jsonwebtoken")

// User Routes
router.post("/signup", async (req, res) => {
    // Implement user signup logic
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        await User.create({ username, password });
        res.json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ message: "Unable to create user" });
    }
});

router.post("/signin", async (req, res) => {
    // Implement admin signup logic
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            res.status(411).json({ message: "invalid username or password" });
            return;
        }
        const token = `Bearer ${jwt.sign(
            { username },
            process.env.JWT_SECRET
        )}`;

        res.json({ token });
    } catch (e) {
        console.error(e.message);
        res.status(411).json({ message: "invalid username or password" });
    }
});

router.get("/courses", async (req, res) => {
    // Implement listing all courses logic
    try {
        const allCourses = await Course.find({});
        res.json({ courses: allCourses });
    } catch (e) {
        res.status(500).json({ message: "Unable to fetch courses" });
    }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    try {
        // Extract courseId from request parameters
        const courseId = req.params.courseId;

        // Extract username from request headers
        const username = req.username;

        // Update the user document to push the courseId into purchasedCourses array
        await User.updateOne(
            { username },
            {
                $push: { purchasedCourses: courseId },
            }
        );

        res.json({ message: "Course purchased successfully" });
    } catch (error) {
        console.error("Error purchasing course:", error);
        res.status(500).json({
            message: "Unable to purchase course",
        });
    }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
        const user = await User.findOne({ username: req.username });
        const courses = await Course.find({
            _id: {
                $in: user.purchasedCourses,
            },
        });
        res.json({ courses });
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch purchased courses",
        });
    }
});

module.exports = router;
