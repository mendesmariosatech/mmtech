import { Hono } from 'hono'
import { verify, type JwtVariables } from 'hono/jwt'
import { ENV_TYPES } from '../env/zod'
import { env } from 'hono/adapter'
import { bearerAuth } from 'hono/bearer-auth'

// type Variables = JwtVariables
// Compatible with the Next.JS 14 API routes
export const base_api_path = "/api"

const app = new Hono().basePath(base_api_path)

export { app }