import { Client } from "pg";

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "pg",
    user: "shubham",
    password: "hashtag",
});

export async function getClient(): Promise<Client> {
    try {
        await client.connect();
        console.log("Database connected successfully!");
        return client;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error; // Rethrow the error to handle it in the caller function
    }
}
