import { hc } from "hono/client";
import type { AppType } from "@repo/server";

export const hono_client = hc<AppType>("http://localhost:3001");
