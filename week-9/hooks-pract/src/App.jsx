import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [render, setRender] = useState(true);

    useEffect(() => {
        // setTimeout(() => {
        //     setRender(false);
        // }, 10 * 1000);

        setInterval(() => {
            setRender((r) => !r);
        }, 10000);
    }, []);

    return <div>{render && <MyComponent />}</div>;
}

export default App;

// function MyComponent() {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         console.log("component mounted");

//         return () => {
//             console.log("component unmounted");
//         };
//     }, []);

//     const incrementCount = () => {
//         setCount(count + 1);
//     };
//     return (
//         <div>
//             <p>{count}</p>
//             <button onClick={incrementCount}>Increment</button>
//         </div>
//     );
// }

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }
    incrementCount = () => {
        this.setState({ count: this.state.count + 1 });
    };

    componentDidMount(){
        console.log("component did mount");
    }
    componentWillUnmount(){
        console.log("component will unmount");
    }
    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.incrementCount}>Increment</button>
            </div>
        );
    }
}
