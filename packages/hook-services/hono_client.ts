import { hc } from "@repo/server";
import type { AppType } from "@repo/server";

export const hono_client = hc<AppType>(process.env.__NEXT_PRIVATE_ORIGIN || "");
