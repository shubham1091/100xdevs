import { Client } from "pg";
import { getClient } from "./utils";

// Async function to insert data into a table
async function insertData_unsafe() {
    try {
        const insertQuery =
            "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
        const res = await client?.query(insertQuery);
        console.log("Insertion success:", res); // Output insertion result
    } catch (err) {
        console.error("Error during the insertion:", err);
    }
}
async function insertData_safe(
    username: string,
    email: string,
    password: string
) {
    // Ensure client connection is established
    try {
        const insertQuery =
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        const values = [username, email, password];
        const res = await client?.query(insertQuery, values);
        console.log("Insertion success:", res); // Output insertion result
    } catch (err) {
        console.error("Error during the insertion:", err);
    }
}

async function insertAddress(
    user_id: number,
    city: string,
    country: string,
    street: string,
    pincode: string
) {
    // Ensure client connection is established
    const insertQuery = "INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)";
    const values = [user_id, city, country, street, pincode];
    try {
        const res = await client?.query(insertQuery, values);
        console.log("Insertion success:", res); // Output insertion result
    } catch (err) {
        console.error("Error during the insertion:", err);
    }
}
let client: Client | null = null;
async function main() {
    client = await getClient();
    await insertData_safe("username5", "user5@example.com", "user_password");
    await insertAddress(1, "New York", "USA", "123 Broadway St", "10001");
    await client.end();
}

main();
