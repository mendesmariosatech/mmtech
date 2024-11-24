import { hc } from "hono/client";
import type { AppType } from "@repo/server";
import { getBaseUrl } from "./getUrl";

export const hono_client = hc<AppType>(getBaseUrl());
