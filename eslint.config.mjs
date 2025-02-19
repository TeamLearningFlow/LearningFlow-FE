import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // react-hooks 관련 규칙 추가
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error', // 훅 규칙 검사를 에러로 처리
      'react-hooks/exhaustive-deps': 'warn', // 의존성 배열 검사를 경고로 처리
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
