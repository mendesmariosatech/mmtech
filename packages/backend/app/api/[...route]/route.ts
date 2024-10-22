import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { OpenAPIHono, z, RouteHandler } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'

export const runtime = 'edge'

console.log('Hello from Hono!')
console.log(process.env.ronaldo)

const route = createRoute({
  method: 'get',
  path: "/hello",
  tags: ['hello'],
  responses: {
    404: {
      description: 'Not found',
      content: {
        'application/json': {
          schema: z.object({
            NotFound: z.string(),
          })
        },
      },
    },
    200: {
      description: 'Hello from Hono!',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          })
        },
      },
    }
  },
})

type LoginRoute = typeof route


const app = new OpenAPIHono().basePath('/api')

const routesHello: RouteHandler<LoginRoute> = (c) => {
  return c.json({
    message: 'Hello from Hono!'
  }, 200)
}

app.openapi(route, routesHello)

app.doc("/docs", {
  openapi: "3.0.0",
  info: {
    title: "Hono API",
    version: "1.0.0",
  },
})

app.get("/scalar", apiReference({
  theme: 'bluePlanet',
  layout: "classic",
  defaultHttpClient: {
    targetKey: "node",
    clientKey: "axios",
  },
  spec: {
    url: "/api/docs"
  }
}))

export const GET = handle(app)
