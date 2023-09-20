# Writing docs

## Autodocs

Storybook Autodocs is a powerful tool that can help you quickly generate comprehensive documentation for your UI components.

### Setup automated documentation

To enable auto-generated documentation for your stories, you'll need to add the `tags` configuration property to the story's default export:

```tsx
// Button.stories.ts|tsx

const meta: Meta<typeof Button> = {
  component: Button,
  //👇 Enables auto-generated documentation for the component story
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
```

![](https://storybook.js.org/28b2f00782649b7c2ad244ee333fb402/autodocs.png)

### Configure

You can extend your Storybook configuration file (`.storybook/main.ts`) and provide additional options to control how documentation gets created.

```tsx
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  docs: {
    //👇 See the table below for the list of supported options
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
};

export default config;
```

### Write a custom template

You can customize the page storybook used to display the docs using a [React component](https://storybook.js.org/docs/react/writing-docs/autodocs#write-a-custom-template) or with [MDX](https://storybook.js.org/docs/react/writing-docs/autodocs#with-mdx).


### Configure the table of contents

https://storybook.js.org/docs/react/writing-docs/autodocs#configure-the-table-of-contents


### Customize the Docs Container

https://storybook.js.org/docs/react/writing-docs/autodocs#customize-the-docs-container


### Override the default theme

https://storybook.js.org/docs/react/writing-docs/autodocs#override-the-default-theme


## MDX

you can write pure documentation pages in MDX and add them to Storybook alongside your stories

For example, we create a file `Checkbox.mdx` that import stories from `Checkbox.stories.ts` and display it along with markdown content:

```mdx
{/* Checkbox.mdx */}

import { Canvas, Meta } from '@storybook/blocks';

import * as CheckboxStories from './Checkbox.stories';

<Meta of={CheckboxStories} />

# Checkbox

A checkbox is a square box that can be activated or deactivated when ticked. 

Use checkboxes to select one or more options from a list of choices.

<Canvas of={CheckboxStories.Unchecked} />
```

```tsx
// Checkbox.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    label: 'Unchecked',
  },
};
```

And here's how that's rendered in Storybook:

![](https://storybook.js.org/08f62e5a2195638a8de4e5a4c9149a78/mdx-simple.png)

See more [here](https://storybook.js.org/docs/react/writing-docs/mdx).


## Preview and build docs

https://storybook.js.org/docs/react/writing-docs/build-documentation