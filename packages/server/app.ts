import app from "./src";

// do something with this app
import { serve } from "@hono/node-server";
serve({
	fetch: app.fetch,
	port: 3000,
});
