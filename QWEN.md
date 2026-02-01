# MM-Tech Project Guidelines

## Overview
MM-Tech is a monorepo project built with Turborepo, using TypeScript, Hono.js for APIs, and Zod for validation. The project follows modern development practices with linting, formatting, and testing.

## Project Structure
- `apps/` - Contains application entry points
- `packages/` - Contains shared packages
  - `@repo/server` - Hono.js API server with Zod validation
  - `@repo/ui` - Shared UI components
  - `@repo/eslint-config` - Shared ESLint configuration
  - `@repo/typescript-config` - Shared TypeScript configuration
  - `@repo/zod-types` - Shared Zod types

## Commands

### Development
- `yarn build` - Build all packages using Turbo
- `yarn format` - Format code using Biome
- `yarn lint` - Lint code using Biome
- `yarn server:test` - Run server package tests
- `yarn prepare` - Prepare husky git hooks

### Testing
- `yarn server:test` - Run server tests (specific test commands may be available in individual packages)

### UI Management
- `yarn ui:add` - Add UI components
- `yarn ui:storybook` - Run Storybook for UI components

## Coding Standards

### Formatting
- Use tabs for indentation (not spaces)
- Line width maximum of 80 characters
- Use double quotes for strings
- Automatic import organization

### TypeScript Usage
- Strict TypeScript mode
- Type safety required for all functions and variables
- Use Zod for schema validation
- Use Hono.js with Zod-OpenAPI for API routes

### API Development
- Use Hono.js framework with Zod-OpenAPI
- Define routes with explicit schema validation
- Follow RESTful API design principles
- Use proper HTTP status codes (200 for success, 404 for not found, 500 for errors)
- Include proper error handling with structured error responses

### Example API Route Structure
```typescript
import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../base/type";
import { dbContext } from "../middleware/dbContext";

export const exampleRouteSpec = createRoute({
  method: "get",
  path: "/example",
  tags: ["examples"],
  middleware: [dbContext],
  responses: {
    200: {
      description: "Success response",
      content: {
        "application/json": {
          schema: z.object({
            data: z.string(),
          }),
        },
      },
    },
  },
});

type ExampleRoute = typeof exampleRouteSpec;

export const exampleRouteHandler: AppRouteHandler<ExampleRoute> = async (c) => {
  return c.json({ data: "example" }, 200);
};
```

### Testing Standards
- Use Jest for testing
- Follow the testing patterns shown in existing test files
- Use Hono's testClient for API route testing
- Use .$post, .$get methods for test client calls (not .post, .get)
- Include proper response status and data validation
- Test both success and error cases
- Clean up test data before and after tests

### Example Test Structure
```typescript
import { describe, expect, test } from "@jest/globals";
import { testClient } from "hono/testing";
import { exampleRouter } from "./example";

describe("Example API Tests", () => {
  test("should return expected data", async () => {
    const client = testClient(exampleRouter);
    
    const response = await client.example.$get(); // Note the $ prefix
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("data");
  });
});
```

## Git Workflow
1. Create a new branch from `dev`: `git checkout -b username/descriptive-branch-name`
2. Make your changes following the coding standards
3. Test your changes thoroughly
4. Format your code: `yarn format`
5. Lint your code: `yarn lint`
6. Commit with a clear message
7. Push to your branch
8. Create a pull request to `dev`

## Contribution Guidelines
- Follow the existing code style and patterns
- Write tests for new functionality
- Update tests when modifying existing functionality
- Keep functions focused and modular
- Use meaningful variable and function names
- Document complex logic with comments
- Ensure all tests pass before submitting a pull request

## Environment Configuration
- Environment variables are managed through `.env` files
- Use proper authentication and database connection settings
- Validate environment variables at startup

## Error Handling
- Return structured error responses using JSON format
- Use appropriate HTTP status codes
- Include meaningful error messages
- Log errors appropriately for debugging

## Database Operations
- Use Drizzle ORM for database operations
- Follow the existing patterns in the `drizzle/` directory
- Use proper middleware for database context
- Handle database errors gracefully