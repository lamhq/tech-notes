# Built-In CSS Support

## Adding a Global Stylesheet

To add a stylesheet to your application, import the CSS file within `pages/_app.js`

```css
/* styles.css */
body {
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  padding: 20px 20px 60px;
  max-width: 680px;
  margin: 0 auto;
}
```

```js
// pages/_app.js
import '../styles.css'
import 'bootstrap/dist/css/bootstrap.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```


## Adding Component-Level CSS

Next.js supports CSS Modules using the `[name].module.css` file naming convention. CSS Module files can be imported anywhere in your application.

```css
/* components/Button.module.css */
.error {
  color: white;
  background-color: red;
}
```

```js
// components/Button.js
import styles from './Button.module.css'

export function Button() {
  return (
    <button
      type="button"
      // Note how the "error" class is accessed as a property on the imported
      // `styles` object.
      className={styles.error}
    >
      Destroy
    </button>
  )
}
```


## Sass Support

Next.js allows you to import Sass using both the `.scss` and `.sass` extensions. You can use component-level Sass via CSS Modules and the `.module.scss` or `.module.sass` extension.

Before you can use Next.js' built-in Sass support, be sure to install `sass`:

```yml
yarn add sass
```

The `.scss` extension requires you use the SCSS syntax, while the `.sass` extension requires you use the **Indented Syntax ("Sass")**.

If you're not sure which to choose, start with the `.scss` extension which is a superset of CSS, and doesn't require you learn the **Indented Syntax ("Sass")**.

If you want to configure the Sass compiler you can do so by using `sassOptions` in `next.config.js`.

```js
// next.config.js
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
```