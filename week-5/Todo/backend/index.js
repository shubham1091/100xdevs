import express from "express";
import { createTodo, updateTodo } from "./types.js";
import todo from "./db.js";

const app = express();

app.use(express.json());
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
        res.json({ msg: newTodo._id });
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
    await todo.updateOne({ _id: parsedPayload.data.id }, { completed: true });
    res.json({ msg: "done" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
