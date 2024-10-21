/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["src"],
  testMatch: ["**/*.test.ts"],
  setupFiles: ["dotenv/config"],
};
