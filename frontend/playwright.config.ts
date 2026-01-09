import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["html", { open: "never" }], ["list"]],
  webServer: {
    command: "npm run dev",
    url: process.env.E2E_BASE_URL || "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } }
  ]
});
