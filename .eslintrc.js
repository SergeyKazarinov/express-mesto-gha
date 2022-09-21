module.exports = {
  env: {
    browser: false,
    node: true,
    mongo: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: 'true',
    },
  },
  rules: {
    'no-underscore-dangle': [
      'error',
      { allow: ['_id'] },
    ],
  },
};
