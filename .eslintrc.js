module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  plugins: ["react", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "airbnb"
  ],
  parser: "@babel/eslint-parser",
  rules: {
    // enable additional rules
    indent: ["error", 2],
    "linebreak-style": 0,
    quotes: ["error", "double"],
    semi: ["error", "always"],

    // override configuration set by extending "eslint:recommended"
    "no-empty": "warn",
    "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "for-direction": "off",
    "comma-dangle": 0,
    camelcase: "warn",
    "no-underscore-dangle": 0,
    "import/no-cycle": 0
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/"],
  settings: {
    react: {
      version: "17.0.1", // "detect" automatically picks the version you have installed.
    },
  },
};
