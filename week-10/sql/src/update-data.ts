import { getClient } from "./utils";
import { Client } from "pg";

async function updateTodo(todoId: number) {
    const client: Client = await getClient();

    const updateTodoText: string = "UPDATE todos SET done = $1 WHERE id = $2";
    await client.query(updateTodoText, [true, todoId]);

    console.log(`Todo with ID ${todoId} updated to done!`);
}

const todoIdToUpdate: number = 1;
updateTodo(todoIdToUpdate);
