import axios from "axios";
import { useEffect, useMemo, useState } from "react";
function App() {
    const [counter, setCounter] = useState(0);
    const [inputVal, setInputVal] = useState(0);

    let count = useMemo(() => {
        let count = 0;
        for (let i = 0; i <= inputVal; i++) count += i;
        return count;
    }, [inputVal]);

    return (
        <div>
            <input
                type="number"
                placeholder="number"
                onChange={(e) => {
                    setInputVal(e.target.value);
                }}
            />
            <br />
            sum from 0 to {inputVal} is {count}
            <br />
            <button onClick={() => setCounter((pr) => pr + 1)}>
                counter ({counter})
            </button>
        </div>
    );
}

export default App;