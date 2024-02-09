import express from "express";
import { createTodo, updateTodo } from "./types.js";
import todo from "./db.js";
import cors from "cors";
import "dotenv/config";

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json(), cors(corsOptions));

app.get("/todos", async (req, res) => {
    try {
        const allTodo = await todo.find({});
        res.json({ todo: allTodo });
    } catch (err) {
        res.status(500).json({ message: "Unable to fetch todos" });
    }
});

app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(400).json({ msg: "You sent the wrong imputs" });
        return;
    }
    // console.log(parsedPayload)
    try {
        const newTodo = await todo.create({
            title: parsedPayload.data.title,
            description: parsedPayload.data.description,
            completed: false,
        });
        res.json({ newTodo });
    } catch (error) {
        res.status(500).json({ message: "Unable to create todo" });
    }
});

app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({ msg: "You sent the wrong imputs" });
        return;
    }
    // const task = await todo.updateOne({ _id: parsedPayload.data.id }, { completed: true });
    const task = await todo.findOne({ _id: parsedPayload.data.id });
    task.completed = true;
    await task.save();
    res.json({ todo: task });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
