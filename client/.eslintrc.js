module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'react-app',
    'react-app/jest'
  ],
  settings: {
    react: { version: 'detect' }
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'consistent-return': 'off',
    'react/react-in-jsx-scope': 'off'
  }
};
