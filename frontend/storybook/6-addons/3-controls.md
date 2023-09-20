# Controls

Storybook Controls gives you a graphical UI to interact with a component's arguments dynamically, without needing to code.

To use the Controls addon, you need to write your stories using **args**. Storybook will automatically generate UI controls based on your args and what it can infer about your component.


## Choosing the control type

For instance, suppose you have a `variant` arg on your story that should be `primary` or `secondary`. This replaces the input with a radio group for a more intuitive experience:

```jsx
// Button.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
```

## Mapping arg values to control

```tsx
// Button.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from './icons';

const arrows = { ArrowUp, ArrowDown, ArrowLeft, ArrowRight };

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    arrow: {
      options: Object.keys(arrows), // An array of serializable values
      mapping: arrows, // Maps serializable option values to complex arg values
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
        labels: {
          // 'labels' maps option values to string labels
          ArrowUp: 'Up',
          ArrowDown: 'Down',
          ArrowLeft: 'Left',
          ArrowRight: 'Right',
        },
      },
    },
  },
};

export default meta;
```

## Configuration

The Controls addon can be configured in two ways:

- Individual controls can be configured via control **annotations**.
- The addon's appearance can be configured via **parameters**.

### Annotation

You can configure individual controls with the “control" annotation in the `argTypes` field of either a component or story.

See all available controls [here](https://storybook.js.org/docs/react/essentials/controls#annotation).


### Parameters

Specify initial preset color swatches:

```tsx
// .storybook/preview.ts

// Replace your-framework with the framework you are using (e.g., react, vue3)
import { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    controls: {
      presetColors: [{ color: '#ff4785', title: 'Coral' }, 'rgba(0, 159, 183, 1)', '#fe4a49'],
    },
  },
};

export default preview;
```

- Specify initial preset color swatches
- Disable controls for specific properties
- Conditional exclude controls
- Hide NoControls warning
- Filtering controls
- Sorting controls