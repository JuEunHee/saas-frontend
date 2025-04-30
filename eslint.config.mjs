import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/typescript', 'prettier'],
    plugins: ['prettier'],
    rules: {
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/no-default-export': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'import/prefer-default-export': 'off', // 기본 export 강제 비활성화
      'react/jsx-props-no-spreading': 'off', // JSX props spreading 허용
      '@typescript-eslint/lines-between-class-members': 'off', // 클래스 멤버 사이에 빈 줄 강제 비활성화
      '@typescript-eslint/space-before-function-paren': 'off',
      'react/jsx-max-props-per-line': [
        'error',
        {
          maximum: 1, // 한 줄에 하나의 속성만 허용
          when: 'multiline', // 항상 줄바꿈 강제
        },
      ],
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          tabWidth: 2,
          jsxBracketSameLine: false,
          arrowParens: 'always',
          endOfLine: 'lf',
          bracketSameLine: false,
          bracketSpacing: true,
          quoteProps: 'as-needed',
          useTabs: false,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js 기본 모듈 (예: fs, path)
            'external', // 외부 라이브러리 (예: react, lodash)
            'internal', // 내부 모듈 (예: src/utils)
            'parent', // 부모 디렉토리에서 가져온 모듈 (예: ../module)
            'sibling', // 같은 디렉토리에서 가져온 모듈 (예: ./module)
            'index', // index 파일 (예: ./)
            'object', // 객체 형태의 import (예: import { something } from './module')
            'type', // 타입 import (TypeScript 전용)
          ],
          alphabetize: {
            order: 'asc', // 오름차순 정렬
            caseInsensitive: true, // 대소문자 구분 없음
          },
        },
      ],
    },
    globals: {
      React: 'readonly', // React를 전역 변수로 선언
    },
  }),
];

export default eslintConfig;
