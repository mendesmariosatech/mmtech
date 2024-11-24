import app from "./src";
import { serve } from "@hono/node-server";

const PORT = process.env.PORT || 4000;
serve({
	fetch: app.fetch,
	port: PORT,
});

console.log(`🚀 node server started on port http://localhost:${PORT}/api`);
