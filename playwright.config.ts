import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src",
  testMatch: "**/*.test.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://localhost:6009",
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:6009",
    reuseExistingServer: !process.env.CI,
  },
});
