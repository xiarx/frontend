import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactConfig,
  {
    languageOptions: {
      ...reactConfig.languageOptions,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    },
  },
];
