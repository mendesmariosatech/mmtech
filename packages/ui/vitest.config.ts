// vitest.config.ts
import { defineConfig } from "vite";
import { storybookNextJsPlugin } from "@storybook/experimental-nextjs-vite/vite-plugin";

export default defineConfig({
	plugins: [storybookNextJsPlugin()],
});