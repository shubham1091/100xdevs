const { Router } = require("express");
const { Admin, Course, User } = require("../db");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const router = Router();
require("dotenv").config;

// Admin Routes
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the admin with this username exists
        const admin = await Admin.findOne({ username });

        if (admin) {
            res.status(400).json({ message: "username already exists" });
            return;
        }

        // Create a new admin
        await Admin.create({ username, password });

        res.json({ message: "Admin created successfully" });
    } catch (err) {
        res.status(400).json({ message: "Unable to create admin" });
    }
});

router.post("/signin", async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    // console.log(username, password);
    const isValid = await Admin.findOne({ username, password });
    // console.log(isValid);
    if (!isValid) {
        res.status(411).json({ message: "invalid username or password" });
        return;
    }
    const token = `Bearer ${jwt.sign({ username }, process.env.JWT_SECRET)}`;
    res.json({ token });
});

router.post("/courses", adminMiddleware, async (req, res) => {
    try {
        // Extract course details from the request body
        const { title, description, imageLink, price } = req.body;

        // Assuming the admin's ID is available in the request object after applying the middleware
        const authorId = req.adminId; // Assuming you set adminId in the adminMiddleware

        // Create the course with the author's ID
        const course = await Course.create({
            title,
            description,
            imageLink,
            price,
            author: authorId, // Associate the course with the author's ID
        });

        res.json({
            message: "Course created successfully",
            courseId: course._id,
        });
    } catch (err) {
        res.status(400).json({
            message: "Unable to create course",
        });
    }
});

router.get("/courses", adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const allCourses = await Course.find({ author: req.adminId });

        res.json({ courses: allCourses });
    } catch (err) {
        res.status(500).json({ message: "Unable to fetch courses" });
    }
});

module.exports = router;
