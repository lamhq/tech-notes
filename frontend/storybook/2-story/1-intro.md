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
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Button',
  component: Button,
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  name: 'I am the primary',
  render: () => <Button primary label="Button" />,
};
```
