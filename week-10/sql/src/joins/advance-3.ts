import { getClient } from "../utils";
import { Client, QueryResult } from "pg";
import { User, Todo } from "../types";

async function getAllTodosWithUserDetails() {
    const client: Client = await getClient();

    const joinQuery: string = `
        SELECT todos.*, users.email, users.password
        FROM todos
        JOIN users ON todos.user_id = users.id;
    `;

    const res: QueryResult<Todo & User> = await client.query(joinQuery);
    const results: (Todo & User)[] = res.rows;

    console.log("Todos with User Details:", results);
}

getAllTodosWithUserDetails();
