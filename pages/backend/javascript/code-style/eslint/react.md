# React

Install and configure ESLint for a React (TypeScript) project.


## Installation

```shell npm2yarn
npm install eslint eslint-plugin-react eslint-plugin-react-hooks globals --save-dev
```

## Configuration

Update `eslint.config.mjs`:
```js
import react from 'eslint-plugin-react';
import globals from 'globals';

export default tseslint.config(
  // ... ,
  {
    files: ['**/*.{jsx,tsx}'],
    settings: { react: { version: '18.3' } },
    plugins: {
      'react-hooks': reactHooks,
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Enable its recommended rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      
      // other rules...
     },
  },
  // ...
)
```


## Vite project set up

Follow this section if your project is created from Vite TypeScript React template.

Configure the top-level `parserOptions` property:
```js
parserOptions: {
  // for Vite projects
  project: ['./tsconfig.node.json', './tsconfig.app.json'],
  tsconfigRootDir: import.meta.dirname,
},
```


## References

- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#configuration-new-eslintconfigjs)
- `README.md` file of Vite TypeScript React template