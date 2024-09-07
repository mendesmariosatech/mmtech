import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
export { handle }


