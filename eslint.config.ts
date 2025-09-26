import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
	{ files: ["**/*.ts"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
	tseslint.configs.recommended,
	eslintPluginPrettierRecommended
]);
