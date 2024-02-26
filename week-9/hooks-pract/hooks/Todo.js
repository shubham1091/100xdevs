import axios from "axios";
import { useEffect, useState } from "react";

export function useTodo(n) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            axios
                .get("https://sum-server.100xdevs.com/todos")
                .then((response) => {
                    setTodos(response.data.todos);
                    setLoading(false);
                });
        }, 1000 * n);
        axios.get("https://sum-server.100xdevs.com/todos").then((response) => {
            setTodos(response.data.todos);
            setLoading(false);
        });

        return () => clearInterval(interval);
    }, [n]);

    return [todos, loading];
}
