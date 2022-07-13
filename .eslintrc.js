module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // node_modules/eslint-plugin-vue/lib/configs/vue3-strongly-recommended.js
    'plugin:vue/vue3-strongly-recommended',
    'standard',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-undef': 'off', // ts会检查
    'lines-between-class-members': 0,
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'func-call-spacing': 'off',
    'vue/html-self-closing': 'off',
    'vue/valid-v-model': 'off',
    'dot-notation': 'off'
  },
  overrides: [
    {
      files: ['src/api/**/*.ts'],
      rules: {
        camelcase: 'off'
      }
    }
  ]
}
