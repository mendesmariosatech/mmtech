import { hc } from "@repo/server";
import type { AppType } from "@repo/server";

export const hono_client = hc<AppType>("http://localhost:3001");
