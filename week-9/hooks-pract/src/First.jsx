import { useState } from "react";
import { useTodo } from "../hooks/Todo";
import { useDebounce } from "../hooks/bounce";
import { useIsonline } from "../hooks/online";

export const Frist = () => {
    const [todos, loading] = useTodo(50);
    const isonline = useIsonline();
    const [inpVal, setInpVal] = useState("");
    const debounced = useDebounce(inpVal, 500);

    return (
        <div>
            <input
                type="text"
                value={inpVal}
                onChange={(e) => setInpVal(e.target.value)}
                placeholder="search"
            />
            <p>{debounced}</p>
            {isonline ? <div>you are online</div> : <div>you are offline</div>}
            {loading ? (
                <div>loading...</div>
            ) : (
                todos.map((todo, i) => <Todo todo={todo} key={i} />)
            )}
        </div>
    );
};

function Todo({ todo }) {
    return (
        <div>
            {todo.title}
            <br />
            {todo.description}
        </div>
    );
}
