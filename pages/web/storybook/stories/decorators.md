# Decorators

Decorators are a mechanism to wrap a component in arbitrary markup when rendering a story.

A simple example is adding padding to a component’s stories by wrapping the stories in a `div`. 

```tsx
import type { Meta } from '@storybook/react';

import { YourComponent } from './YourComponent';

const meta: Meta<typeof YourComponent> = {
  component: YourComponent,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
};

export default meta;
```
