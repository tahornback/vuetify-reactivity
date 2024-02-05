/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-strongly-recommended', '@vue/standard', '@vue/typescript', 'plugin:vuetify/base'],
  plugins: [
    'vuetify'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules:{
    'vuetify/no-deprecated-props': 0
  }
}
