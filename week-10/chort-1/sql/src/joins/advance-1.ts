import { getClient } from "../utils";
import { Client, QueryResult } from "pg";
import { User, Todo } from "../types";

async function getUserAndTodosWithJoin(userId: number) {
    const client: Client = await getClient();

    const joinQuery: string = `
        SELECT users.*, todos.title, todos.description, todos.done
        FROM users
        LEFT JOIN todos ON users.id = todos.user_id
        WHERE users.id = $1;
    `;

    const res: QueryResult<User & Todo> = await client.query(joinQuery, [
        userId,
    ]);
    const results: (User & Todo)[] = res.rows;

    console.log("User and Todos:", results);
}

getUserAndTodosWithJoin(1);
