How to use the server package

- In a Next.js app create a file called `app/api/[[...route]].ts`

```ts
import app, { handle } from "@repo/server";

export const runtime = "edge";

export const GET = handle(app);
export const POST = handle(app);
```

Server client

```ts
import { hc } from "@repo/server";
import type { AppType } from "@repo/server";

const DEV_URL = `http://localhost:${PORT}/`;
const PROD_URL = `http://127:0.0.1:${PORT}/`;

const PROD = false;
const PORT = process.env.PORT || 3001;

const URL = PROD ? PROD_URL : DEV_URL;
export const hono_client = hc<AppType>(URL);
```

```ts
import { hono_client } from "@repo/server";
const URL = hono_client.api.$url();
```
