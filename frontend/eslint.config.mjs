import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory });
const tsRuleNames = new Set(
  Object.keys(tsPlugin.rules).map((name) => `@typescript-eslint/${name}`),
);

const configs = compat.config({
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["@typescript-eslint", "import", "jsx-a11y", "prettier", "react", "react-hooks"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "linebreak-style": "off",
    "react/jsx-filename-extension": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
  },
});

export default [
  { ignores: ["**/generated-api-client.tsx"] },
  ...configs.map((config) => ({
    ...config,
    rules: Object.fromEntries(
      Object.entries(config.rules ?? {}).filter(
        ([name]) => !name.startsWith("@typescript-eslint/") || tsRuleNames.has(name),
      ),
    ),
  })),
];
