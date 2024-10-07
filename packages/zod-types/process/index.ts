import { z } from "zod";

export const envVariables = z.object({
	TURSO_CONNECTION_URL: z.string().optional(),
	TURSO_AUTH_TOKEN: z.string().optional(),
	JWT_SECRET_KEY: z.string().optional(),
	COOkIE_SECRET_KEY: z.string().optional(),
	LANG: z.string().optional(),
});

export const ENV_VARIABLES = envVariables.parse(process.env);

export type ENV_TYPES = z.infer<typeof envVariables>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends ENV_TYPES { }
	}
}
