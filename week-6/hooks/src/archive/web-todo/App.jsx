import { useEffect, useState } from "react";

function App() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const res = await fetch("https://sum-server.100xdevs.com/todos");
        const data = await res.json();
        setTodos(data.todos);
        setTimeout(fetchData, 5000);
    }
    return (
        <div>
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    title={todo.title}
                    description={todo.description}
                />
            ))}
        </div>
    );
}

export default App;
function Todo({ title, description }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
