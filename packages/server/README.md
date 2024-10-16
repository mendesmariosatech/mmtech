# Server Package

## How to use the server package

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

## Writing Jest Test

```ts
// file to be tested: auth.ts
export const authRoute = new Hono()
	.post("/register", registerFormValidation, async (c) => {
    ...
  })
```

## Test File

```ts
import { afterAll, describe, expect, test, jest } from "@jest/globals";
import { testClient } from "hono/testing";
import { authRoute } from "./auth";

describe("New User - POST /auth/register", () => {
  test("User can register using a new email and valid password", async () => {
    const resp = await testClient(authRoute).register.$post({
      json: user,
    });

    const data = await resp.json();

    expect(data.status).toBe(200);
  });
});
```

## Jest Test Scripts

### `test`

Runs the Jest test suite using the environment variables specified in the `.env` file. This is useful for running tests in a controlled environment.

### `test:watch`

Runs Jest in watch mode, automatically re-running tests when files change. It also uses the environment variables from the `.env` file, making it ideal for active development.

### `test:ci`

Runs the Jest test suite without any specific environment configuration. This is typically used in Continuous Integration (CI) environments where tests need to be run in a clean state.

### `test:coverage`

Runs the Jest test suite and collects coverage information. This helps you understand how much of your code is tested and where additional tests may be needed.
