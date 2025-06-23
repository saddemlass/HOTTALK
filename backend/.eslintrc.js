module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-unused-vars': 'off',        // on désactive les warnings de variables non utilisées
    'consistent-return': 'off',     // on désactive l’obligation de return sur tous les chemins
    'no-console': 'off',
    'no-undef': 'error'
  }
};
