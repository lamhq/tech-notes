# Play function

Play functions are small snippets of code executed after the story renders.

Enabling you to interact with your components and test scenarios that otherwise required user intervention.

## Setup the interactions addon

We recommend installing Storybook's `addon-interactions` before you start writing stories with the `play` function:
- it includes a handy set of UI controls to allow you command over the execution flow. 
- you can pause, resume, rewind, and step through each interaction
- Also provides you with an easy-to-use debugger for potential issues.

```shell
pnpm add --save-dev @storybook/testing-library @storybook/jest @storybook/addon-interactions
```

Update your Storybook configuration (in `.storybook/main.js|ts`) to include the interactions addon.

```ts
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // Other Storybook addons
    '@storybook/addon-interactions', // 👈 Register the addon
  ],
};

export default config;
```

## Writing stories with the play function

For example, if you were working on a registration form and wanted to validate it, you could write the following story with the `play` function:

```tsx
// RegistrationForm.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, within } from '@storybook/testing-library';

import { RegistrationForm } from './RegistrationForm';

const meta: Meta<typeof RegistrationForm> = {
  component: RegistrationForm,
};

export default meta;
type Story = StoryObj<typeof RegistrationForm>;

/*
 * See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText('email', {
      selector: 'input',
    });

    await userEvent.type(emailInput, 'example-email@email.com', {
      delay: 100,
    });

    const passwordInput = canvas.getByLabelText('password', {
      selector: 'input',
    });

    await userEvent.type(passwordInput, 'ExamplePassword', {
      delay: 100,
    });
    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    const submitButton = canvas.getByRole('button');

    await userEvent.click(submitButton);
  },
};
```


## Composing play functions

```tsx
// MyComponent.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, within } from '@storybook/testing-library';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

/*
 * See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const FirstStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    userEvent.type(canvas.getByTestId('an-element'), 'example-value');
  },
};

export const SecondStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('other-element'), 'another value');
  },
};

export const CombinedStories: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Runs the FirstStory and Second story play function before running this story's play function
    await FirstStory.play({ canvasElement });
    await SecondStory.play({ canvasElement });
    await userEvent.type(canvas.getByTestId('another-element'), 'random value');
  },
};
```


## Working with events

A common type of component interaction is a button click. If you need to reproduce it in your story, you can define your story's play function as the following:

```tsx
// MyComponent.stories.ts|tsx

import { fireEvent, userEvent, within } from '@storybook/testing-library';

// ...

/* See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const ClickExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByRole('button'));
  },
};

export const FireEventExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await fireEvent.click(canvas.getByTestId('data-testid'));
  },
};
```


You can introduce **delays** within your play function to emulate user interaction:

```tsx
/* See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const DelayedStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const exampleElement = canvas.getByLabelText('example-element');

    // The delay option set the ammount of milliseconds between characters being typed
    await userEvent.type(exampleElement, 'random string', {
      delay: 100,
    });

    const AnotherExampleElement = canvas.getByLabelText('another-example-element');
    await userEvent.type(AnotherExampleElement, 'another random string', {
      delay: 100,
    });
  },
};
```

Verify the existence of an element based on a specific interaction:

```tsx
import { userEvent, waitFor, within } from '@storybook/testing-library';

/* See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const ExampleAsyncStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const Input = canvas.getByLabelText('Username', {
      selector: 'input',
    });

    await userEvent.type(Input, 'WrongInput', {
      delay: 100,
    });

    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    const Submit = canvas.getByRole('button');
    await userEvent.click(Submit);

    await waitFor(async () => {
      await userEvent.hover(canvas.getByTestId('error'));
    });
  },
};
```


## Querying elements

```tsx
// MyComponent.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, within } from '@storybook/testing-library';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

/* See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const ExampleWithRole: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByRole('button', { name: / button label/i }));
  },
};
```

## Canvas selection

By default, each interaction you write inside your play function will be executed starting from the top-level element of the Canvas.

You can adjust your interactions to start execution from the component's root.

```tsx
// MyComponent.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, within } from '@storybook/testing-library';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const ExampleStory: Story = {
  play: async ({ canvasElement }) => {
    // Assigns canvas to the component root element
    const canvas = within(canvasElement);

    // Starts querying from the component's root element
    await userEvent.type(canvas.getByTestId('example-element'), 'something');
    await userEvent.click(canvas.getByRole('another-element'));
  },
};
```
