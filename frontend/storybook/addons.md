# Addons

## Controls

Storybook Controls gives you a graphical UI to interact with a component's arguments dynamically, without needing to code.

### Choosing the control type

```jsx
// Button.stories.js

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
```

### Fully custom args

```tsx
// YourComponent.stories.js

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { YourComponent, YourComponentProps } from './your-component'

// a function to apply some computation
const someFunction = (valuePropertyA, valuePropertyB) => {
  // makes some computations and returns something
};

export default {
  component: YourComponent,
  title: 'A complex case with a function',
  // creates specific argTypes with options
  argTypes: {
    propertyA: {
      control: {
        type: 'select',
        options: [
          'Item One',
          'Item Two',
          'Item Three'
        ],
      },
    },
    propertyB: {
      control: {
        type: 'select',
        options: [
          'Another Item One',
          'Another Item Two',
          'Another Item Three'
        ],
      },
    },
  },
} as Meta;

const Template: Story<YourComponentProps> = ({propertyA, propertyB, ...rest}) => {
  const someFunctionResult = someFunction(propertyA, propertyB);
  return <YourComponent somePoperty={someFunctionResult} {...rest} />;
};
```

https://storybook.js.org/docs/react/essentials/controls#annotation


## Actions

The actions addon is used to display data received by event handler (callback) arguments in your stories.

### Action argType annotation

```tsx
// Button.stories.js

export default {
  title: 'Button',
  argTypes: { onClick: { action: 'clicked' } },
};
```

### Automatically matching args

```js
// Button.stories.js

export default {
  title: 'Button',
  component: Button,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};
```


## Viewport

The Viewport toolbar item allows you to adjust the dimensions of the iframe your story is rendered in. This makes it easy to develop responsive UIs.

```js
// .storybook/preview.js

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

export const parameters = {
  viewport: { viewports: customViewports },
};
```