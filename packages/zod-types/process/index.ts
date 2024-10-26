import { z } from "zod";

export const envVariables = z.object({
	TURSO_CONNECTION_URL: z.string(),
	TURSO_AUTH_TOKEN: z.string(),
	JWT_SECRET_KEY: z.string(),
	COOkIE_SECRET_KEY: z.string(),
	LANG: z.string().default("pt_BR"),
});

const ENV_VARIABLES = envVariables.safeParse(process.env);

if (!ENV_VARIABLES.success) {
	console.error(ENV_VARIABLES.error.errors);
}

export type ENV_TYPES = z.infer<typeof envVariables>;
export { ENV_VARIABLES };

declare global {
	namespace NodeJS {
		interface ProcessEnv extends ENV_TYPES {}
	}
}
