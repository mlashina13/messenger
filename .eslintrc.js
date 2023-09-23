module.exports = {
  extends: [
    'airbnb-base',
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off"
  },
  env: {
    es6: true,
    browser: true,
  },
};
