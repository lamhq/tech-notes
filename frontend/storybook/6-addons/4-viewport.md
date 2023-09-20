# Viewport

The Viewport toolbar item allows you to adjust the dimensions of the iframe your story is rendered in. This makes it easy to develop responsive UIs.

## Configuration

### Change the default set of viewports

```tsx
// .storybook/preview.ts

// Replace your-framework with the framework you are using (e.g., react, vue3)
import { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: newViewports, // newViewports would be an ViewportMap. (see below for examples)
      defaultViewport: 'someDefault',
    },
  },
};

export default preview;
```

### Add new devices

If you have either a specific viewport or a list of viewports that you need to use:

```tsx
// .storybook/preview.ts

// Replace your-framework with the framework you are using (e.g., react, vue3)
import { Preview } from '@storybook/your-framework';

import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const customViewports = {
  kindleFire2: {
    name: 'Kindle Fire 2',
    styles: {
      width: '600px',
      height: '963px',
    },
  },
  kindleFireHD: {
    name: 'Kindle Fire HD',
    styles: {
      width: '533px',
      height: '801px',
    },
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
    },
  },
};

export default preview;
```


### Configuring per component or story

```tsx
// MyComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  parameters: {
    //👇 The viewports object from the Essentials addon
    viewport: {
      //👇 The viewports you want to use
      viewports: INITIAL_VIEWPORTS,
      //👇 Your own default viewport
      defaultViewport: 'iphone6',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const MyStory: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
};
```
