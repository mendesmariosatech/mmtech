import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'


export const personalRoute = new Hono()
  .get('/me',
    zValidator(
      'query',
      z.object({
        email: z.string().optional(),
        password: z.string().optional(),
      }).optional(),
    ), (c) => {
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