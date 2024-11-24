import app from "@repo/server";
import { handle } from "hono/vercel";

// export const runtime = "edge"; //
export const runtime = "nodejs";

export const OPTIONS = handle(app);
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
