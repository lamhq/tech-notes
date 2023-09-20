# Using args

A story is a function that describes how to render a component. You can have multiple stories per component, and the simplest way to create stories is to render a component with different arguments multiple times.

“Args” are Storybook’s mechanism for defining those arguments in a single JavaScript object. Args can be used to dynamically change props, slots, styles, inputs, etc. It allows Storybook and its addons to live edit components.

## Args object

The args object is a JSON serializable object composed of string keys with matching valid value types that can be passed into a component.


## Story args

To define the args of a single story, use the args CSF story key:

```tsx
// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonProps } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
```


## Component args

You can define args at the component level; they will apply to all the component's stories unless you overwrite them

```tsx
// Button.stories.ts|tsx

import React from 'react';

import { ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Button',
  component: Button,
  //👇 Creates specific argTypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    //👇 Now all Button stories will be primary.
    primary: true,
  },
} as ComponentMeta<typeof Button>;
```

## Global args

You can define args at the global level; they will apply to every component's stories unless you overwrite them.

To do so, define the args property in the default export of `preview.js`:

```ts
// .storybook/preview.ts

// Replace your-renderer with the renderer you are using (e.g., react, vue3, angular, etc.)
import { Preview } from '@storybook/your-renderer';

const preview: Preview = {
  // The default value of the theme arg for all stories
  args: { theme: 'light' },
};

export default preview;
```


## Render custom args

```ts
// Page.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './Page';

type PagePropsAndCustomArgs = React.ComponentProps<typeof Page> & { footer?: string };

const meta: Meta<PagePropsAndCustomArgs> = {
  component: Page,
  render: ({ footer, ...args }) => (
    <Page {...args}>
      <footer>{footer}</footer>
    </Page>
  ),
};
export default meta;

type Story = StoryObj<PagePropsAndCustomArgs>;

export const CustomFooter: Story = {
  args: {
    footer: 'Built with Storybook',
  },
};
```


## Mapping to complex arg values

Arg values can be "mapped" from a simple string to a complex type using the `mapping` property in `argTypes`:

```tsx
// MyComponent.stories.js|jsx|ts|tsx

import { MyComponent } from './MyComponent';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'MyComponent',
  component: MyComponent,
  argTypes: {
    label:{
      options: ['Normal', 'Bold', 'Italic'],
      mapping: {
        Bold: <b>Bold</b>,
        Italic: <i>Italic</i>,
      },
    },
  },
};
```
