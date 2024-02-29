import { getClient } from "./utils";
import { Address, User } from "./types";
import { QueryResult } from "pg";

// Async function to fetch user data from the database given an email
async function getUserFromEmail(email: string) {
    const client = await getClient();
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];

    try {
        // Ensure client connection is established
        const result: QueryResult<User> = await client.query(query, values);

        if (result.rows.length > 0) {
            console.log("User found:", result.rows[0]); // Output user data
            return result.rows[0]; // Return the user data
        } else {
            console.log("No user found with the given email.");
            return null; // Return null if no user was found
        }
    } catch (err) {
        console.error("Error during fetching user:", err);
        throw err; // Rethrow or handle error appropriately
    } finally {
        await client.end(); // Close the client connection
    }
}

async function get() {
    const client = await getClient();
    const select = "SELECT * FROM users;";
    try {
        const { rows }: QueryResult<User> = await client.query(select);
        console.log("Users:");
        rows.forEach((user) =>
            console.log(`ID: ${user.id}, Email: ${user.email}`)
        );
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        client.end();
    }
}
get();
// Example usage
getUserFromEmail("user5@example.com").catch(console.error);
