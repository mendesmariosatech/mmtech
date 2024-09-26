
import { COOKIES } from "../cookies";
import { createMiddleware } from "hono/factory";
import { ENV_TYPES } from "../env/zod";
import { getSignedCookie, getCookie } from "hono/cookie";
import { env } from "hono/adapter";
import { decodeToken } from "../jwt_token";

export const authMiddleware = createMiddleware(async (c, next) => {
  const { COOkIE_SECRET_KEY, JWT_SECRET_KEY } = env<ENV_TYPES>(c)

  console.log(`[${c.req.method}] ${c.req.url}`)

  const token = await getSignedCookie(c, COOkIE_SECRET_KEY, COOKIES.USER_TOKEN)
  const getEmail = getCookie(c, COOKIES.USER_ID)

  if (!token) return c.json({ error: 'Unauthorized' }, 401)

  const decode = await decodeToken(token, JWT_SECRET_KEY)
  c.set('jwtPayload', decode)
  c.set('email', getEmail)

  await next()
})