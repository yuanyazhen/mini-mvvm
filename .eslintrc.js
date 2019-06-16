module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
    'prettier',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    // 'plugin:vue/essential',
    // 'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    page: true,
  },
  rules: {
    "prettier/prettier": "error",
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
