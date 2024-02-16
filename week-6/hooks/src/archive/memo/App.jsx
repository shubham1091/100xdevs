import { useState } from "react";

function App() {
    return (
        <div>
            <HeaderWithButton/>
            <Header title="shubham" />
            <Header title="shubham" />
            <Header title="shubham" />
        </div>
    );
}

export default App;

function HeaderWithButton() {
    const [title, setTitle] = useState("my name is shubham");
    function updateTitle() {
        setTitle(`my name is ${Math.random()}`);
    }

    return <div>
        <button onClick={updateTitle}>Update the title</button>
        <Header title={title} />
    </div>
}

function Header({ title }) {
    return <div>{title}</div>;
}
