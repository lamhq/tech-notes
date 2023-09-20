# Configure

## Component context

Setup context provider component:

```jsx
// .storybook/preview.js

import React from 'react';

import { ThemeProvider } from 'styled-components';

export const decorators = [
  (Story) => (
    <ThemeProvider theme="default">
      <Story />
    </ThemeProvider>
  ),
];
``` 

## Styling

### CSS-in-JS

If you are using CSS-in-JS, you may need to add a decorator to `.storybook/preview.js`.

### Import CSS

Storybook allows you to import CSS files in your components directly.

### Global imported styles

If you have global imported styles, you can import it in `.storybook/preview.js`

### Add webfonts and external CSS in `<head>`

you can inject a CSS link tag to the `<head>` by modifying `.storybook/preview-head.html` to add arbitrary HTML.


## Static assets

If you're referencing fonts or images from a local directory, you'll need to configure the Storybook script to serve the static files.

Use the `staticDirs` configuration element in `.storybook/main.js` to specify the directories where your assets live:

```js
// .storybook/main.js
module.exports = {
  stories: [],
  addons: [],
  staticDirs: ['../public', '../static'],
};
```

Use it in a component or story like this:

```ts
//  MyComponent.stories.ts|tsx

import React from 'react';

import imageFile from './static/image.png';

import { Meta } from '@storybook/react';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'img',
} as Meta;

const image = {
  src: imageFile,
  alt: 'my image',
};
// Assume image.png is located in the "public" directory.
export const WithAnImage = () => <img src="/image.png" alt="my image" />;
```

### Relative paths

Sometimes, you may want to deploy your Storybook into a subpath, like https://example.com/storybook.

In this case, you need to have all your images and media files with relative paths. Otherwise, the browser cannot locate those files.
