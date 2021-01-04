module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:@typescript-eslint/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    impliedStrict: true,
    ecmaFeatures: {
      legacyDecorators: true,
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  parser: "@typescript-eslint/parser",
  plugins: ["prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": "error",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-ignore": "warn",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/camelcase": "warn",
    "@typescript-eslint/interface-name-prefix": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        mocha: true
      }
    }
  ]
};
