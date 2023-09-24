module.exports = {
  extends: [
    'airbnb-base',
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    es2016: true,
    node: true
  },
  rules: {
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "": "never",
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "interface-name-prefix": "off",
    "max-len": [1, 200],
    "no-useless-constructor": "off",
    "class-methods-use-this": "off",
    "prefer-regex-literals": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle" :"off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "func-names": "off",
    "no-console": "off",
    "no-throw-literal": "off",
    "no-use-before-define": "off",
    "consistent-return": "off",
    "no-restricted-syntax": "off",
    "no-empty-function": "off",
    "no-empty-function": "off"
  }
};
