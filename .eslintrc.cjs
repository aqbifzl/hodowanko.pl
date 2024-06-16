/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "prefer-arrow", "import", "react"],
  extends: [
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "max-len": ["error", {"code": 100}],
    "object-curly-newline": ["error", 
      {
        "ImportDeclaration": {"minProperties": 3},
        "ExportDeclaration": "never"
      }
    ],
    "react/jsx-max-props-per-line": ["error", { "maximum": 1 }],
    "react/jsx-wrap-multilines": ["error", {
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical": "parens-new-line",
      "prop": "parens-new-line"
    }],
    "react/jsx-one-expression-per-line": ["error", { "allow": "single-child" }],
    "function-paren-newline": ["error", {"minItems": 2}],
    'object-property-newline': ['error'],
    "array-bracket-newline": ["error", "always"],
    "import/first": "error",
    "import/exports-last": "error",
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        "disallowPrototype": true,
        "singleReturnOnly": false,
        "classPropertiesAllowed": false
      }
    ],
    "prefer-arrow-callback": [
      "error",
      { "allowNamedFunctions": true }
    ],
    "func-style": [
      "error",
      "expression",
      { "allowArrowFunctions": true }
    ],
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: { attributes: false },
      },
    ],
  },
};

module.exports = config;
