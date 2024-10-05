import { env } from 'hono/adapter';
export const runningProcess = () => {
  console.log("process");

  const precess = process.env.NODE_ENV

  if (precess === "development") {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  }

  if (precess === "production") {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  }
};