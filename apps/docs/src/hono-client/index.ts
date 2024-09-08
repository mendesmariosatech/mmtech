import { hc } from "@repo/server";
import type { AppType } from "@repo/server";


const DEV_URL = `http://localhost:${process.env.PORT || 3001}`
console.log("DEV_URL", DEV_URL);
// const PROD_URL = 'https://mmtech-docs.vercel.app'

//TODO: pattern to get env variables
//
const isProductionURL = () => DEV_URL

export const hono_client = hc<AppType>(isProductionURL())
