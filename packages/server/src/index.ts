import { handle } from 'hono/vercel'
import { app, base_api_path } from './base/base-app'
import { authRoute } from './routes/auth/register'
import { hc } from 'hono/client'
import { personalRoute } from './routes/personal/me'

const route = app.get('/', (c) => c.text('Hello Hono!'))
  .route('/auth', authRoute)
  .route('/personal', personalRoute)

export default app
export { handle, base_api_path, hc }

export type AppType = typeof route