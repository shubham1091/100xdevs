function addTodo() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (!title || !description) {
        alert("Please enter title and description.");
        return;
    }

    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("div");
    todoItem.className = "todo";
    todoItem.innerHTML = `
        <div class="details">
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Description:</strong> ${description}</p>
        </div>
        <button onclick="markDone(this)">Mark Done</button>
    `;

    todoList.appendChild(todoItem);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
}

function markDone(button) {
    const todoItem = button.parentNode;
    const completedList = document.getElementById("completedList");
    const todoList = document.getElementById("todoList");

    // Move todo to completed column
    completedList.appendChild(todoItem);

    // Change button text and functionality
    button.textContent = "Undo";
    button.onclick = function() { undoMarkDone(this); };
}

function undoMarkDone(button) {
    const todoItem = button.parentNode;
    const todoList = document.getElementById("todoList");

    // Move todo back to todo column
    todoList.appendChild(todoItem);

    // Change button text and functionality
    button.textContent = "Mark Done";
    button.onclick = function() { markDone(this); };
}