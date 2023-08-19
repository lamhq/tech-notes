# Custom CSS Support

For example, consider the following stylesheet named `styles.css`:

```css filename="styles.css"
body {
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  padding: 20px 20px 60px;
  max-width: 680px;
  margin: 0 auto;
}
```

You can create a `pages/_app.js` file and import your CSS files there:

```jsx filename="pages/_app.js"
import '../styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```
