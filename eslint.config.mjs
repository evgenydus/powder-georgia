import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default [
  {
    ignores: ['scripts/**', '.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs['flat/recommended'],
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs.flat['recommended-latest'],
  nextPlugin.configs['core-web-vitals'],
  {
    plugins: {
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
      'sort-destructure-keys': sortDestructureKeys,
      'sort-keys-fix': sortKeysFix,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      'import/extensions': 'off',
      'import/no-cycle': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'max-lines': [
        'error',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'no-param-reassign': 'off',
      'no-underscore-dangle': 'off',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: '*',
          prev: ['block-like', 'const', 'let'],
        },
        {
          blankLine: 'any',
          next: ['const', 'let'],
          prev: ['const', 'let'],
        },
        {
          blankLine: 'always',
          next: ['block-like', 'return'],
          prev: '*',
        },
      ],
      'prettier/prettier': 'error',
      'react/destructuring-assignment': 'off',
      'react/forbid-prop-types': 'off',
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
        },
      ],
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.tsx'],
        },
      ],
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-sort-props': [
        'error',
        {
          reservedFirst: ['key', 'ref'],
        },
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      semi: ['error', 'never'],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^@?\\w'],
            ['^@/.*(constants|helpers|hooks)(/.*|$)', '^\\.\\/.*(constants|helpers|hooks)(/.*|$)'],
            [
              '^@/.*(common|components|assets)(/.*|$)',
              '^\\.\\/.*(common|components|assets)(/.*|$)',
              '^\\.\\/.*',
              '^../.*',
            ],
            ['^import\\s+type', '^import.*\\{.*type.*\\}.*from'],
          ],
        },
      ],
      'sort-destructure-keys/sort-destructure-keys': ['error', { caseSensitive: true }],
      'sort-keys': ['error', 'asc'],
      'sort-keys-fix/sort-keys-fix': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'max-lines': [
        'error',
        {
          max: 100,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
]
