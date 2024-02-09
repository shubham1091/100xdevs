import { useState } from "react";
import "./App.css";
import Todo from "./Todo";

function App() {
    const [todos, setTodo] = useState([
        { title: "DSA", description: "Study DSA 9-11", status: true },
        { title: "GYM", description: "Go to gym from 7-9", status: true },
    ]);

    return (
        <div>

            {todos.map((todo, index) => {
                // console.log(index);
                return (
                    <Todo
                        key={index}
                        title={todo.title}
                        description={todo.description}
                        completed={todo.status}
                    />
                );
            })}
        </div>
    );
}

export default App;
