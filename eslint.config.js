// eslint.config.js
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import cypress from 'eslint-plugin-cypress';
import prettierPlugin from 'eslint-plugin-prettier'; // <-- IMPORTANT !

export default [
  // ========================================
  // Règles JS/TS de base
  // ========================================
  js.configs.recommended,

  // ========================================
  // Configuration Vue
  // ========================================
  {
    plugins: {
      vue,
    },
    files: ['**/*.vue'],
    rules: {
      'vue/no-multiple-template-root': 'error',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
    },
  },

  // ========================================
  // Prettier
  // ========================================
  {
    plugins: {
      prettier: prettierPlugin, // <-- déclare le plugin ici
    },
    files: ['**/*.{js,ts,vue}'],
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // ========================================
  // Cypress
  // ========================================
  {
    plugins: {
      cypress,
    },
    files: [
      '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
    rules: {
      ...cypress.configs.recommended.rules,
    },
  },

  // ========================================
  // Fichiers à ignorer
  // ========================================
  {
    name: 'ignore dist and coverage',
    ignores: ['public/**', '**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
];
