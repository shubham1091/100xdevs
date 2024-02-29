import { getClient } from "./utils";
import { Client } from "pg";

async function createTable() {
    const createUserTableQuery: string = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;

    const createTodosQuery: string = `
            CREATE TABLE todos (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                user_id INTEGER REFERENCES users(id),
                done BOOLEAN DEFAULT FALSE
            );
        `;

    let client: Client | null = null;
    try {
        client = await getClient();
        await client.query(createUserTableQuery);
        console.log("user table created successfully");

        await client.query(createTodosQuery);
        console.log("todo Table created successfully!");
    } catch (error) {
        console.error("Error creating tables:", error);
    } finally {
        if (client) {
            await client.end();
        }
    }
}

createTable();
