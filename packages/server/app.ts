import "dotenv/config";
import app from "./src";
import { serve } from "@hono/node-server";

const PORT = 3000;
serve({
	fetch: app.fetch,
	port: PORT,
});

console.log(`🚀 node server started on port http://localhost:${PORT}/api`);
