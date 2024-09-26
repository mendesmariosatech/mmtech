import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { registerUser, findUser } from "./handlers";

const formValidation = zValidator(
  'form',
  z.object({
    email: z.string(),
    password: z.string(),
  })
)

export const authRoute = new Hono()
  .post('/register', formValidation,
    (c) => {
      const { email, password } = c.req.valid('form')

      const user = registerUser(email, password)

      return c.json({ data: user }, 201)
    }
  )
  .post('/sign-in', formValidation,
    (c) => {
      const { email, password } = c.req.valid('form')

      const user = findUser(email, password)

      return c.json({ data: user }, 201

      )
    })