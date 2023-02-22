module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    semi: 0,
    indent: 0,
    'space-before-function-paren': [
      'error',
      {anonymous: 'always', named: 'never'},
    ],
    'multiline-ternary': 0,
    'object-curly-spacing': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
  },
}
