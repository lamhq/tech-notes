# Get started with Tailwind CSS

Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

## Version

This document is applied for version `3.3.3` (2023).


## Installation (Vite & React)

1. Install `tailwindcss` via `npm`, and create your `tailwind.config.js` file.
    ```bash
    yarn add -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
1. Configure your template paths `tailwind.config.js`
    ```tsx
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```
1. Add the Tailwind directives to your CSS (`index.css`)
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
1. Start your build process
    ```bash
    npm run dev
    ```
1. Start using Tailwind in your project
    ```tsx
    export default function App() {
      return (
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      )
    }
    ```


## Editor Setup

### VS Code

Install [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension:
- Autocomplete. Intelligent suggestions for class names, as well as CSS functions and directives.
- Linting. Highlights errors and potential bugs in both your CSS and your markup.
- Hover Previews. See the complete CSS for a Tailwind class name by hovering over it.
- Syntax Highlighting. Provides syntax definitions so that Tailwind features are highlighted correctly.


### Prettier

Install [Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) for Tailwind CSS that automatically sorts your classes following our [recommended class order](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted).


## Optimizing for Production

With CSS files are small, you don’t have to worry about complex solutions like code-splitting your CSS for each page, and can instead just ship a single small CSS file that’s downloaded once and cached until you redeploy your site.

If you’re using Tailwind CLI, you can minify your CSS by adding the `--minify` flag:

```bash
npx tailwindcss -o build.css --minify
```

If you’ve installed Tailwind as a PostCSS plugin, add `cssnano` to the end of your plugin list (`postcss.config.js`):

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
}
```

If you’re using a framework, check the documentation as this is often handled for you in production automatically and you don’t even need to configure it.
