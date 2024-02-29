import { getClient } from "./utils";
import { Client } from "pg";

async function addIndex() {
    const client: Client = await getClient();

    const createIndexQuery: string = "CREATE INDEX idx_todos_user_id ON todos(user_id)";
    await client.query(createIndexQuery);

    console.log("Index added successfully on user_id column of todos table!");
}

addIndex();
