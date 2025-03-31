import { defineConfig } from "eslint/config";
import globals from "globals";

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
]);