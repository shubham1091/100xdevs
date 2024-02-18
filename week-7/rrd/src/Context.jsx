import { useState } from "react";
import { CountContext } from "./Count";
import { useContext } from "react";

export default function Context() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <CountContext.Provider value={{ count, setCount }}>
                <Count />
            </CountContext.Provider>
        </div>
    );
}

function Count() {
    return (
        <div>
            <CountRenderer />
            <Button />
        </div>
    );
}

function CountRenderer() {
    const {count} = useContext(CountContext);

    return <div>{count}</div>;
}

function Button() {
    const {setCount} = useContext(CountContext);
    
    return (
        <div>
            <button
                onClick={() => {
                    setCount((count) => count + 1);
                }}
            >
                Increse
            </button>
            <button
                onClick={() => {
                    setCount((count) => count - 1);
                }}
            >
                Decrese
            </button>
        </div>
    );
}
