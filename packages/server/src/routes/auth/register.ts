import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { AuthTable } from "./handlers";
import { hashPassword } from "../../utils/bcrypt";
import { env } from "hono/adapter";
import { ENV_TYPES } from "../../env/zod";

const formValidation = zValidator(
  'form',
  z.object({
    email: z.string(),
    password: z.string(),
  }).optional(),
)

export const authRoute = new Hono()
  .post('/register', formValidation,
    async (c) => {
      const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env<ENV_TYPES>(c)
      const form = c.req.valid('form')

      if (!form) return c.json({ error: 'Invalid form data' }, 400)

      const { email, password } = form
      const auth = new AuthTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN)

      const user = await auth.findUser(email)
      if (user) return c.json({ error: 'User already exists' }, 400)

      const passwordDigest = await hashPassword(password)
      if (!passwordDigest) return c.json({ error: 'Password digest failed' }, 400)

      const newUser = await auth.registerUser(email, passwordDigest)
      if (!newUser) return c.json({ error: 'User creation failed' }, 400)

      return c.json({ data: newUser }, 201)
    }
  )
  .post('/login', formValidation,
    async (c) => {
      const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env<ENV_TYPES>(c)
      const form = c.req.valid('form')

      if (!form) return c.json({ error: 'Invalid form data' }, 400)

      const { email, password } = form

      const auth = new AuthTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN)
      const user = await auth.findUser(email)

      return c.json({ data: user }, 201

      )
    })