import { memo, useState } from "react";

function Sam() {
    const [title, setTitle] = useState("my name is shubham");
    function updateTitle() {
        setTitle(`my name is ${Math.random()}`);
    }
    return (
        <div>
            <button onClick={updateTitle}>update the title</button>
            <Header title={title} />
            <Header title="shubham" />
            <Header title="shubham" />
            <Header title="shubham" />
        </div>
    );
}

export default Sam;

const Header = memo(({ title }) => {
    return <div>{title}</div>;
});
