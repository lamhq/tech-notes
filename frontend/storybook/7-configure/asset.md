# Images, fonts, and assets

## Import assets into stories

You can import any media assets by importing (or requiring) them. It works out of the box with our default config.


## Serving static files via Storybook Configuration

Use the `staticDirs` configuration element in `.storybook/main.js` to specify the directories where your assets live:

```js
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: [
    '../public',
    { from: '../my-custom-assets/images', to: '/assets' }
  ], //👈 Configures the static asset folder in Storybook
};

export default config;
```

Use it in a component or story like this:

```ts
//  MyComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

// Assume image.png is located in the "public" directory.
export const WithAnImage: Story = {
  render: () => <img src="/image.png" alt="my image" />,
};
```

## Relative paths

Sometimes, you may want to deploy your Storybook into a subpath, like https://example.com/storybook.

In this case, you need to have all your images and media files with relative paths. Otherwise, the browser cannot locate those files.

Suppose you are serving assets in a static directory along with your Storybook. In that case, you need to use relative paths to load images or use the base element.