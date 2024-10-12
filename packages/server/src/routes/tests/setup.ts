import { DBConnection } from "../../drizzle/drizzle-client";
import { authTable } from "../../drizzle/schema";

const dbConnection = new DBConnection(
  process.env.TURSO_CONNECTION_URL,
  process.env.TURSO_AUTH_TOKEN,
);

export const deleteDB = {
  async deleteTableAuth() {
    await dbConnection.db.delete(authTable)
  }
}
