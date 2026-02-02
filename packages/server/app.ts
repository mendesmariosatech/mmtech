import "dotenv/config";
import app from "./src";
import { serve } from "@hono/node-server";
import "dotenv/config";

const PORT = process.env.PORT || 4000;
try {
	const server = serve({
		fetch: app.fetch,
		port: Number(PORT),
	});

	process.on("SIGTERM", () => {
		console.log("Recebido SIGTERM. Iniciando graceful shutdown...");
		server.close(() => {
			console.log("Servidor encerrado com sucesso");
			process.exit(0);
		});
	});
} catch (error) {
	console.error("Erro ao iniciar o servidor:", error);
	process.exit(1);
}

console.log(`🚀 node server started on port http://localhost:${PORT}/api`);
console.log(`📜 Open API Docs on port http://localhost:${PORT}/api/swagger`);
