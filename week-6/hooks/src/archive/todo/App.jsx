import { useState } from "react";
import randomParagraph from "random-paragraph";

let counter = 4;
const list = [
    {
        id: 1,
        title: "DSA",
        description: "Study DSA 9-11",
    },
    {
        id: 2,
        title: "GYM",
        description: "Go to gym from 7-9",
    },
    {
        id: 3,
        title: "learn react",
        description: "become react developer",
    },
];

function App() {
    const [todo, setTodo] = useState(list);
    function addTodo() {
        setTodo([
            ...todo,
            {
                id: counter++,
                title: randomParagraph().split(" ").slice(0, 3).join(" "),
                description: randomParagraph().split(" ").slice(0, 3).join(" "),
            },
        ]);
    }
    return (
        <div>
            <button onClick={addTodo}>Add a todo</button>
            <ul>
                {todo.map(({ title, description, id }) => (
                    <Todo key={id} title={title} description={description} />
                ))}
            </ul>
        </div>
    );
}

export default App;

function Todo({ title, description }) {
    return (
        <li>
            <h3>{title}</h3>
            <p>{description}</p>
        </li>
    );
}
