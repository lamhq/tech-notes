# Tips

## Enable `emitDecoratorMetadata`

### Solution

Update babel config to add a plugin that allow emitting decorator metadata

### Todo

Install babel plugin

```bash
yarn add --dev babel-plugin-transform-typescript-metadata
```

Update `vite.config.ts`

```tsx
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    ...
    // enable emitting decorator metadata
    react({
      babel: {
        plugins: ['babel-plugin-transform-typescript-metadata'],
        parserOpts: {
          plugins: ['decorators-legacy'],
        },
      },
    }),
    ...
  ],
});
```

Reference: 
- [babel-plugin-transform-typescript-metadata](https://github.com/leonardfactory/babel-plugin-transform-typescript-metadata)
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#proposed-syntax)