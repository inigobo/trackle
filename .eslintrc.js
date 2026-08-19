module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module' },
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:jest/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'promise', 'react', 'relations'],
  rules: {
    // OFF
    'react/display-name': ['off', { ignoreTranspilerName: false }],


    // WARN
    'eol-last': 1,
    'no-console': [
      'warn',
      {
        allow: ['error'],
      },
    ],
    'relations/restrict': [
      'error',
      {
        rules: [
          {
            from: /__tests__/,
            to: /.*/,
            type: "allowed",
            message: "tests can import from anywhere",
          },
          {
            from: "src/ui/contexts",
            to: /src\/config\/(.*)/,
            type: "allowed",
            message: "contexts can import from config",
          },
          {
            from: "src/domain",
            to: /src\/(config|application|infrastructure|ui|pages)/,
            type: "restricted",
            message: "domain should only import from itself",
          },
          {
            from: "src/application",
            to: /src\/(infrastructure|ui|pages)/,
            type: "restricted",
            message: "application should only import from itself and domain",
          },
          {
            from: "src/infrastructure",
            to: /src\/(config|ui|pages)/,
            type: "restricted",
            message:
              "infrastructure should only import from domain and application",
          },
          {
            from: "src/pages",
            to: /src\/(infrastructure|domain)/,
            type: "restricted",
            message:
              "pages should only import from useCases (application layer) and config",
          },
          {
            from: "src/ui",
            to: /src\/(infrastructure|domain|config)/,
            type: "restricted",
            message: "ui should only import from useCases (application layer)",
          },
          {
            from: "src/pages",
            to: /src\/application\/(.*)\/services/,
            type: "restricted",
            message: "pages should not include any application service",
          },
          {
            from: "src/ui",
            to: /src\/application\/(.*)\/services/,
            type: "restricted",
            message: "ui should not include any application service",
          },
          {
            from: "*",
            to: "testUtils",
            type: "restricted",
            message: "do not import from testUtils folder",
          },
        ],
      },
    ],
  },
}
