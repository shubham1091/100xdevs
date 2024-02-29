import { Client } from "pg";
import { getClient } from "./utils";
async function createTable() {
    const createUser: string = ` 
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`;

    const createAdd: string = `
        CREATE TABLE addresses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`;

    let client: Client | null = null;
    try {
        client = await getClient();
        await client.query(createUser);
        console.log("user table created successfully");
        await client.query(createAdd);
        console.log("Address table created successfully");
    } catch (err) {
        console.error("error creating table" + err);
    } finally {
        client?.end();
    }
}

createTable();
