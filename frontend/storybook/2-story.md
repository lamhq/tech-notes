# Story

## What's a Story

A story captures the rendered state of a UI component.

Developers write multiple stories per component that describe all the “interesting” states a component can support.


## Using stories

When building apps, one of the biggest challenges is to figure out if a piece of UI already exists in your codebase and how to use it for the new feature you're building.

Here's the workflow:

- 🗃 Use the sidebar to find a suitable component
- 👀 Review its stories to pick a variant that suits your needs
- 📝 Copy/paste the story definition into your app code and wire it up to data


## Basic Story

```tsx
// Button.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = () => (
  <Button backgroundColor="#ff0" label="Button" />
);
// Rename Story
Primary.storyName = 'I am the primary';

export const Secondary: ComponentStory<typeof Button> = () => (
  <Button backgroundColor="#ff0" label="😄👍😍💯" />
);

export const Tertiary: ComponentStory<typeof Button> = () => (
  <Button backgroundColor="#ff0" label="📚📕📈🤓" />
);
```


## Using args

### Story args

```tsx
// Button.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = { backgroundColor: '#ff0', label: 'Button' };

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, label: '😄👍😍💯' };

export const Tertiary = Template.bind({});
Tertiary.args = { ...Primary.args, label: '📚📕📈🤓' };
```

### Component args

Args at the component level; they will apply to all the component's stories unless you overwrite them.

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

### Global args

args at the global level; they will apply to every component's stories unless you overwrite them.

```ts
// preview.js

// All stories expect a theme arg
export const argTypes = { theme: { control: 'select', options: ['light', 'dark'] } };

// The default value of the theme arg to all stories
export const args = { theme: 'light' };
```

### Mapping arg values

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


## Using parameters

Parameters define static metadata for stories. A story’s parameters can be used to provide configuration to various addons at the level of a story or group of stories.

### Story parameters

```tsx
// Button.stories.js|ts|jsx|tsx

import { Button } from './Button';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Button',
  component: Button,
};

const Template = (args) => ({
  // 👈 Your template goes here
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};
Primary.parameters = {
  backgrounds: {
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
      { name: 'blue', value: '#00f' },
    ],
  },
};
```


### Component parameters

Suppose you wanted to test your Button component against a different set of backgrounds, you might add a component-level `backgrounds` parameter:

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
  //👇 Creates specific parameters for the story
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  },
} as ComponentMeta<typeof Button>;
```

![](https://storybook.js.org/184003737cd16c8e05a1170157880f4b/parameters-background-colors.png)

### Global parameters

We can also set the parameters for all stories via the parameters export of your `.storybook/preview.js` file

```js
// .storybook/preview.js

export const parameters = {
  backgrounds: {
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
    ],
  },
};
```


## Using decorators

Decorators are a mechanism to wrap a component in arbitrary markup when rendering a story.

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
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Button>;
```


## Reuse stories

You can import stories from other components and reuse them.

For instance, if you have a parent `List` component, it may require child `ListItem` components. You can reuse stories from the child `ListItem` in your `List` component.

```ts
// List.stories.js|jsx

import React from 'react';

import { List } from './List';
import { ListItem } from './ListItem';

//👇 We're importing the necessary stories from ListItem
import { Selected, Unselected } from './ListItem.stories';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'List',
  component: List,
};

export const ManyItems = (args) => (
  <List {...args}>
    <Selected {...Selected.args} />
    <Unselected {...Unselected.args} />
    <Unselected {...Unselected.args} />
  </List>
);
```