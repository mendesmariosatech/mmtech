import { Hono } from 'hono'

// Compatible with the Next.JS 14 API routes
export const base_api_path = "/api"
export const app = new Hono().basePath(base_api_path)