import { hc } from "@repo/server";
import type { AppType } from "@repo/server";

const PROD = false
const PORT = process.env.PORT || 3001

const DEV_URL = `http://localhost:${PORT}/`
const PROD_URL = `https://your-hosted-backend:${PORT}/`

const URL = PROD ? PROD_URL : DEV_URL

export const hono_client = hc<AppType>(URL)
