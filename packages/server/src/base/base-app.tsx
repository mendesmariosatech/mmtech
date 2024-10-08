import { Hono } from "hono";

// type Variables = JwtVariables
// Compatible with the Next.JS 14 API routes
export const base_api_path = "/api";

const app = new Hono().basePath(base_api_path);

export { app };
