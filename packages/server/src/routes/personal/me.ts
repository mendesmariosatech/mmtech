import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { env } from "hono/adapter";
import { ENV_TYPES } from "../../env/zod";
import { authMiddleware } from "../../middleware/authentication";


export const personalRoute = new Hono()
  .use('*', authMiddleware)
  .get('/me',
    zValidator(
      'query',
      z.object({
        email: z.string().optional(),
        password: z.string().optional(),
      }).optional(),
    ), async (c) => {
      const { COOkIE_SECRET_KEY } = env<ENV_TYPES>(c)

      const token = c.get('jwtPayload')

      const query = c.req.valid('query')

      if (query && query.email && query.password) {
        return c.json({
          data: {
            email: query.email,
            password: query.password,
          }
        }, 201)
      }

      return c.json({
        error: {
          message: 'Email and password are required',
        }
      }, 404)
    }
  )