import React from "react";

function Todo(props) {
    // console.log(props)
    return (
        <div>
            <h1
                style={
                    props.completed ? { textDecoration: "line-through" } : {}
                }
            >
                {props.title}
            </h1>
            <h2>{props.description}</h2>
        </div>
    );
}

export default Todo;
