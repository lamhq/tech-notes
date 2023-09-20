# Using Essentials addon

## Installation

If you ran `npx storybook@latest init` to include Storybook in your project, the latest version of the Essentials addon (@storybook/addon-essentials) is already installed and configured for you.


## Configuration

If you need to reconfigure any of the individual Essentials addons, install them manually, then register them in your Storybook configuration file (`.storybook/main.ts`) and adjust the configuration to suit your needs.

```tsx
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: {
        csfPluginOptions: null,
        jsxOptions: {},
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [],
          },
        },
      },
    },
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
    '@storybook/addon-toolbars',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
  ],
};

export default config;
```

### Configuration options

https://storybook.js.org/docs/react/essentials/introduction#:~:text=Copy-,Addon,-Option


## Disabling addons

If you need to disable any of the Essential's addons, you can do it by changing your `.storybook/main.js` file.

```tsx
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false, // 👈 disable the backgrounds addon
      },
    },
  ],
};

export default config;
```
