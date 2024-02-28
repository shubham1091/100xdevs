import { getClient } from "./utils";
import { Client } from "pg";

async function createEntries() {
    // Insert a new user into the users table
    const insertUserQuery: string =
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";

    const userValues: Array<string> = [
        "john.doe@gmail.com",
        "hashed_password_here",
    ];
    // Insert a new todo entry associated with the user
    const insertTodoQuery: string =
        "INSERT INTO todos (title, description, user_id, done) VALUES ($1, $2, $3, $4)";

    const client: Client = await getClient();
    try {
        const userResult = await client.query(insertUserQuery, userValues);

        // Retrieve the ID of the newly inserted user
        const userId: number = userResult.rows[0].id;

        const todoValues = [
            "Buy groceries",
            "Milk, bread, and eggs",
            userId,
            false,
        ];
        
        await client.query(insertTodoQuery, todoValues);

        console.log("Entries created successfully!");
    } catch (error) {
        console.error("Error creating entries:", error);
    } finally {
        // Close the database connection
        client.end();
    }
}

createEntries();
