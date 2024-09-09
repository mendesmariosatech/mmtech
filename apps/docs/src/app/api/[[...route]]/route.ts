import app, { handle } from "@repo/server";

// export const runtime = "edge"; // 
export const runtime = "nodejs";

export const GET = handle(app)
export const POST = handle(app)
