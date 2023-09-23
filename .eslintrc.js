module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-ignore': 'allow-with-description' },
    ],
  },
  env: {
    es6: true,
    browser: true,
  }
};
