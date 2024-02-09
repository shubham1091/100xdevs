import mongoose from "mongoose";
import "dotenv/config";

// console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL);

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

export default todo;