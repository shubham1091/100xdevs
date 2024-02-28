import { Client, ClientConfig } from "pg";

const dbConfig: ClientConfig = {
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "mysecretpassword",
    port: 5432,
};
export async function getClient(): Promise<Client> {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        console.log("Database connected successfully!");
        return client;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error; // Rethrow the error to handle it in the caller function
    }
}
