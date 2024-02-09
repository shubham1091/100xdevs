// CreateTodo.jsx
import { useState } from "react";
import "./CreateTodo.css";

function CreateTodo({ onTodoAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function post() {
        const response = await fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const { newTodo } = await response.json();
            // console.log(newTodo);
            onTodoAdded(newTodo); // Update state in parent component
            setTitle("");
            setDescription("");
        } else {
            console.error("Failed to add todo");
        }
    }

    return (
        <div className="todo-form">
            <input
                type="text"
                placeholder="Title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="Description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button onClick={post}>Add Todo</button>
        </div>
    );
}

export default CreateTodo;
