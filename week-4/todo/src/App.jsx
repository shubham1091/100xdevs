import { useState } from 'react';
import './App.css'; // Import your CSS file

function TodoApp() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);

    const addTodo = () => {
        if (!title || !description) {
            alert("Please enter title and description.");
            return;
        }

        const newTodo = {
            title: title,
            description: description
        };

        setTodos([...todos, newTodo]);
        setTitle('');
        setDescription('');
    };

    const markDone = (todoIndex) => {
        const completedTodo = todos[todoIndex];
        const newTodos = todos.filter((_, index) => index !== todoIndex);

        setTodos(newTodos);
        setCompletedTodos([...completedTodos, completedTodo]);
    };

    const undoMarkDone = (completedTodoIndex) => {
        const todoToUndo = completedTodos[completedTodoIndex];
        const newCompletedTodos = completedTodos.filter((_, index) => index !== completedTodoIndex);

        setCompletedTodos(newCompletedTodos);
        setTodos([...todos, todoToUndo]);
    };

    return (
        <div className="container">
            <div className="todo-column" id="createColumn">
                <h2>Create Todo</h2>
                <div>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <br />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <br />
                    <button onClick={addTodo}>Add Todo</button>
                </div>
            </div>
            <div className="todo-column" id="todoColumn">
                <h2>All Todos</h2>
                <div>
                    {todos.map((todo, index) => (
                        <div key={index} className="todo">
                            <div className="details">
                                <p><strong>Title:</strong> {todo.title}</p>
                                <p><strong>Description:</strong> {todo.description}</p>
                            </div>
                            <button onClick={() => markDone(index)}>Mark Done</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="todo-column" id="completedColumn">
                <h2>Completed</h2>
                <div>
                    {completedTodos.map((todo, index) => (
                        <div key={index} className="todo">
                            <div className="details">
                                <p><strong>Title:</strong> {todo.title}</p>
                                <p><strong>Description:</strong> {todo.description}</p>
                            </div>
                            <button onClick={() => undoMarkDone(index)}>Undo</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TodoApp;
