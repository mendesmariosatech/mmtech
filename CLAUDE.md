# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Lint Commands
- Build: `yarn build` (uses Turborepo)
- Format: `yarn format` (Biome formatter)
- Run tests: `yarn server:test` (Jest for server package)
- Run a single test: `yarn server:test -t "test name pattern"`
- UI Storybook: `yarn ui:storybook`
- Dev server: `yarn --filter <app-name> dev` (e.g., `yarn --filter docs dev`)

## Vercel Deployments

The Hobby plan runs one build at a time. To avoid a build queue pile-up:

- **`turbo-ignore` is configured** — `apps/docs/vercel.json` sets `ignoreCommand: "npx turbo-ignore docs"`. Vercel will skip the `docs` build automatically when a commit does not affect the `docs` dependency graph (e.g. a change only to `packages/server` or `apps/web`). No action needed on your part.
- **Skip a build manually** — Add `[skip vercel]` to a commit message when you know a preview is not needed (e.g. doc fixes, config tweaks, WIP commits).
- **Push once per PR, not per commit** — Each push to a branch queues a new build. Do your work locally and push when the branch is ready rather than after every small commit.
- **Branch deploys** — Only `main` and open PR branches are built. Avoid pushing worktree or throwaway branches to the remote unless they have an open PR.

## Code Style Guidelines
- Use tabs for indentation (Biome configured)
- Use double quotes for strings
- TypeScript with strict mode enabled
- Follow NextJS conventions for app directory structure
- Use TailwindCSS for styling
- Import organization: imports are automatically organized by Biome
- Error handling: use Zod for validation and type safety
- Naming: PascalCase for components, camelCase for variables/functions
- File structure: Follow monorepo patterns with packages and apps directories
