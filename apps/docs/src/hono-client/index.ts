import { hc } from "@repo/server";
import type { AppType } from "@repo/server";

const PROD = false
const PORT = process.env.PORT || 3001

const DEV_URL = `http://localhost:${PORT}/`
const PROD_URL = `https://mmtech-web.vercel.app/`

const URL = PROD ? PROD_URL : DEV_URL

export const hono_client = hc<AppType>(global.window?.location.href ?? URL)
