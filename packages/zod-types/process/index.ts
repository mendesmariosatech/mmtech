import { z } from "zod";

export const envVariables = z.object({
	TURSO_CONNECTION_URL: z.string(),
	TURSO_AUTH_TOKEN: z.string(),
	JWT_SECRET_KEY: z.string(),
	COOkIE_SECRET_KEY: z.string(),
	LANG: z.string(),
});

export const ENV_VARIABLES = envVariables.parse(process.env);

export type ENV_TYPES = z.infer<typeof envVariables>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends ENV_TYPES {}
	}
}
