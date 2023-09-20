# Naming components and hierarchy

![](https://storybook.js.org/056e66376330392b5bcc10deb45814b2/naming-hierarchy-sidebar-anatomy.png)

## Grouping

Use the `/` as a separator in `title` to group related components in an expandable interface.

```tsx
// Button.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Design System/Atoms/Button',
  component: Button,
};

export default meta;
```

Yields this:

![](https://storybook.js.org/cf1578585cac847aa3bf5d5b4bb9c9ee/naming-hierarchy-with-path.png)


## Single-story

Single-story components whose display name exactly matches the component's name are displayed as a single item in the sidebar.

```tsx
// Button.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button as ButtonComponent } from './Button';

const meta: Meta<typeof ButtonComponent> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Design System/Atoms/Button',
  component: ButtonComponent,
};

export default meta;
type Story = StoryObj<typeof ButtonComponent>;

// This is the only named export in the file, and it matches the component name
export const Button: Story = {};
```

![](https://storybook.js.org/2001f2b97da97a02b177b3a679ae5be3/naming-hierarchy-single-story-hoisting.png)

You can override the story name using `myStory.storyName = '...'` to match the component name.


## Sorting stories

you can customize stories order by adding `storySort` to the options parameter in your `preview.js file`.

To sort your stories using a custom list, use the `order` array; stories that don't match an item in the `order` list will appear after the items in the list.

```tsx
// .storybook/preview.ts

// Replace your-framework with the framework you are using (e.g., react, vue3)
import { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Intro', 'Pages', ['Home', 'Login', 'Admin'], 'Components'],
      },
    },
  },
};

export default preview;
```

Which would result in this story ordering:

1. `Intro` and then `Intro/*` stories
2. `Pages` story
3. `Pages/Home` and `Pages/Home/*` stories
4. `Pages/Login` and `Pages/Login/*` stories
5. `Pages/Admin` and `Pages/Admin/*` stories
6. `Pages/*` stories
7. `Components` and `Components/*` stories
8. All other stories


If you want specific categories to sort to the end of the list, you can insert a `*` into your `order` array like this:

```tsx
// .storybook/preview.ts

// Replace your-framework with the framework you are using (e.g., react, vue3)
import { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Intro', 'Pages', ['Home', 'Login', 'Admin'], 'Components', '*', 'WIP'],
      },
    },
  },
};

export default preview;
```
