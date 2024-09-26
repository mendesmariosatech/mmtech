
import { COOKIES } from "../cookies";
import { createMiddleware } from "hono/factory";
import { ENV_TYPES } from "../env/zod";
import { getSignedCookie } from "hono/cookie";
import { env } from "hono/adapter";
import { decodeToken } from "../jwt_token";

export const authMiddleware = createMiddleware(async (c, next) => {
  const { COOkIE_SECRET_KEY, JWT_SECRET_KEY } = env<ENV_TYPES>(c)

  console.log(`[${c.req.method}] ${c.req.url}`)
  let token;

  console.log({
    USER_TOKEN: COOKIES.USER_TOKEN,
    COOkIE_SECRET_KEY: COOkIE_SECRET_KEY,
  })

  if (!token) return c.json({ error: 'Unauthorized' }, 401)

  const decode = decodeToken(token, JWT_SECRET_KEY)
  c.set('jwtPayload', decode)
  console.log('token inside middleware', decode)
  // convert to a real user 

  console.log('token inside middleware', decode)

  await next()
})