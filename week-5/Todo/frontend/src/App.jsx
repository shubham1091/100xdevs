// App.jsx

import { useEffect, useState } from "react";
import { CreateTodo, Todos } from "./components";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const json = await response.json();
            setTodos(json.todo);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleTodoAdded = (newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const handleTodoMarked = (updatedTodo) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo._id === updatedTodo._id) {
                    return updatedTodo;
                }
                return todo;
            })
        );
    };

    return (
        <div className="container">
            <div className="create-todo-container">
                <CreateTodo onTodoAdded={handleTodoAdded} />
            </div>
            <div className="todos-container">
            <Todos todos={todos} onTodoMarked={handleTodoMarked} />
            </div>
        </div>
    );
}

export default App;
