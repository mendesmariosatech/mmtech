import { hc } from "@repo/server";
import type { AppType } from "@repo/server";

const PROD = false;
const PORT = process.env.PORT || 3001;

console.log({
  vercel: process.env.VERCEL_URL,
  next: process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL,
})

const URL = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL  // my-site.vercel.app || localhost:3001


const DEV_URL = `http://localhost:${PORT}/`;
const PROD_URL = `https://mmtech-web.vercel.app/`;

// const URL = PROD ? PROD_URL : DEV_URL;
if (!URL) {
  console.log("PROCESS", process.env);
  throw new Error("URL is not defined");
}

export const hono_client = hc<AppType>(URL);
