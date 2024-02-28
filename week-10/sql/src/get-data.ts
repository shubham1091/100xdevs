import { getClient } from "./utils";
import { QueryResult, Client } from "pg";
import { Todo, User } from "./types";

async function getUsers() {
    const selectUsersText: string = "SELECT * FROM users";
    try {
        const client: Client = await getClient();

        const { rows }: QueryResult<User> = await client.query(selectUsersText);
        console.log("Users:");
        rows.forEach((user) =>
            console.log(`ID: ${user.id}, Email: ${user.email}`)
        );
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

async function getUserFromEmail(email: string) {
    const selectUserText: string = "SELECT * FROM users WHERE email = $1";

    try {
        const client: Client = await getClient();

        const { rows }: QueryResult<User> = await client.query(selectUserText, [
            email,
        ]);

        console.log("Single User detail:");
        rows.forEach((user) =>
            console.log(`ID: ${user.id}, Email: ${user.email}`)
        );
    } catch (error) {}
}

async function getTodosForUser(userId: number) {
    const selectTodosText: string = "SELECT * FROM todos WHERE user_id = $1";
    try {
        const client: Client = await getClient();

        const { rows }: QueryResult<Todo> = await client.query(
            selectTodosText,
            [userId]
        );

        console.log(`Todos for User ID ${userId}:`);

        rows.forEach((todo) =>
            console.log(
                `ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description} Done: ${todo.done}`
            )
        );
    } catch (error) {
        console.error(`Error fetching todos for user ID ${userId}:`, error);
    }
}

function main() {
    getUsers();

    getUserFromEmail("john.doe@gmail.com");

    const userIdToFetch = 1;
    getTodosForUser(userIdToFetch);
}

main();
