# Writting story

## Basic

```tsx
// Button.stories.tsx

import React from 'react';
import { Button } from './Button';

export const Primary: React.VFC<{}> = () => <Button primary>Button</Button>;
export const Primary = () => <Button background="#ff0" label="Button" />;
export const Secondary = () => <Button background="#ff0" label="😄👍😍💯" />;
export const Tertiary = () => <Button background="#ff0" label="📚📕📈🤓" />;

Primary.storyName = 'I am the primary';
```


## Using args

```tsx
// Button.stories.tsx

// We create a “template” of how args map to rendering
const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = { background: '#ff0', label: 'Button' };

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, label: '😄👍😍💯' };

export const Tertiary = Template.bind({});
Tertiary.args = { ...Primary.args, label: '📚📕📈🤓' };
```

### Component args

You can also define args at the component level; such args will apply to all stories of the component unless they are overwritten.

```tsx
// Button.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button from './Button';

export default {
  title: "Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    // Now all Button stories will be primary.
    primary: true,
  },
} as Meta;
```

### Args composition

Here’s how args can be used in multiple stories for the same component.

```tsx
// Button.stories.js

const Primary = ButtonStory.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
}

const Secondary = ButtonStory.bind({});
Secondary.args = {
  ...Primary.args,
  primary: false,
}
```


## Using parameters

Parameters are a set of static, named metadata about a story

### Story parameters

```tsx
// Button.story.js

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
    ],
  },
};
```

### Component parameters

```tsx
// Button.stories.tsx

import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Button from './Button';
export default {
  title: 'Button',
  component: Button,
  parameters: {
    backgrounds: {
      values: [
         { name: 'red', value: '#f00', },
         { name: 'green', value: '#0f0', },
         { name: 'blue', value: '#00f', },
      ]
    }
  }
} as Meta;
```


## Using decorators

Decorators are a mechanism to wrap a component in arbitrary markup when rendering a story.

### Story decorators

```tsx
// Button.stories.tsx

export const Primary = …
Primary.decorators = [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
```


### Component decorators

```tsx
// Button.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  decorators:  [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
} as Meta;
```

### Global decorators

```js
// .storybook/preview.js

import React from 'react';

export const decorators = [(Story) => <div style={{ margin: '3em' }}><Story/></div>];
```
