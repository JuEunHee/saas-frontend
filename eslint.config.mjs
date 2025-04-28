import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/typescript', 'prettier'],
    rules: {
      'no-unused-any': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }),
]

export default eslintConfig