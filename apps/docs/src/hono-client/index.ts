import { hc } from "@repo/server";
import type { AppType } from "@repo/server";

console.log({ port: process.env.PORT })

const PROD = false
const PORT = process.env.PORT || 3001

const DEV_URL = `http://localhost:${PORT}/`
const PROD_URL = `http://127:0.0.1:${PORT}/`

const URL = PROD ? PROD_URL : DEV_URL

console.log("URL", DEV_URL);
// const PROD_URL = 'https://mmtech-docs.vercel.app'

//TODO: pattern to get env variables

// const isProductionURL = () => PROD ? PROD_URL : DEV_URL

export const hono_client = hc<AppType>(URL)
