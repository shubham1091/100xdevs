import { getClient } from "../utils";
import { Client, QueryResult } from "pg";
import { User, Todo } from "../types";

async function getUserAndTodosSeparateQueries(userId: number) {
    const client: Client = await getClient();

    // Fetch user details
    const userQuery: string = "SELECT * FROM users WHERE id = $1";
    const userRes: QueryResult<User> = await client.query(userQuery, [userId]);
    const user: User | undefined = userRes.rows[0];

    // Fetch todos for the user
    const todosQuery: string = "SELECT * FROM todos WHERE user_id = $1";
    const todosRes: QueryResult<Todo> = await client.query(todosQuery, [
        userId,
    ]);
    const todos: Todo[] = todosRes.rows;

    console.log("User Details:", user);
    console.log("Todos:", todos);
}

getUserAndTodosSeparateQueries(1);
