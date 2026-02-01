# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Lint Commands
- Build: `yarn build` (uses Turborepo)
- Format: `yarn format` (Biome formatter)
- Run tests: `yarn server:test` (Jest for server package)
- Run a single test: `yarn server:test -t "test name pattern"`
- UI Storybook: `yarn ui:storybook`
- Dev server: `yarn --filter <app-name> dev` (e.g., `yarn --filter docs dev`)

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
