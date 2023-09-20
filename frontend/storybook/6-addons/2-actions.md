# Actions

The actions addon is used to display data received by event handler (callback) arguments in your stories.

## Action args

Actions work via supplying special Storybook-generated “action” arguments to your stories. There are two ways to get an action arg:

### Action argType annotation

```tsx
// Button.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
};

export default meta;
```

If your component calls this arg (`action`), the event will show up in the action panel.


### Automatically matching args

```tsx
// .storybook/preview.ts

// Replace your-framework with the framework you are using (e.g., react, vue3)
import { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

export default preview;
```

Or in your stories:

```tsx
// Button.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;
```
