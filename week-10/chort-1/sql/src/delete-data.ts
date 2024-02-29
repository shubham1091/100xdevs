import { getClient } from "./utils";
import { Client } from "pg";

async function deleteTodo(todoId: number) {
    const client: Client = await getClient();

    const deleteTodoText: string = "DELETE FROM todos WHERE id = $1";
    await client.query(deleteTodoText, [todoId]);

    console.log(`Todo with ID ${todoId} deleted!`);
}

const todoIdToDelete: number = 1;
deleteTodo(todoIdToDelete);
