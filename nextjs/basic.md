# Basic

## Create project

```sh
npm init next-app nextdemo --example "https://github.com/zeit/next-learn-starter/tree/master/learn-starter"
```


## Pages

Pages are associated with a route based on their **file name**. For example, in development:

- `pages/index.js` is associated with the `/` route.
- `pages/posts/first-post.js` is associated with the `/posts/first-post` route.


## Navigate Between Pages

```js
<Link href="/posts/first-post"><a>this page!</a></Link>
```

If you need to add attributes like, for example, `className`, add it to the `a` tag, not to the `Link` tag.


## Assets

Next.js can serve static files, like images, under the top-level `public` directory. Files inside `public` can be referenced from the root of the application similar to `pages`.

```js
<img src="/vercel.svg" alt="Vercel Logo" className="logo" />
```


## Metadata

```js
import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
```


## CSS Styling

### styled-jsx

Next.js is using a library called [styled-jsx](https://github.com/zeit/styled-jsx). It's a "CSS-in-JS" library — it lets you write CSS within a React component, and the CSS styles will be scoped (other components won’t be affected).

```js
<style jsx>{`
  …
`}</style>
```


### Writing and Importing CSS

Next.js has built-in support for CSS and Sass which allows you to import `.css` and `.scss` files.


### CSS Modules

To use CSS Modules, the CSS file name must end with `.module.css`.

```js
import styles from './layout.module.css'

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>
}
```


### Global Styles

Create a top-level `styles` directory and create `global.css` inside:

```css
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
}

* {
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}
```

To load global CSS files, create a file called `_app.js` under `pages` and add the following content:

```js
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

This `App` component is the top-level component which will be common across all the different pages. You can use this `App` component to keep state when navigating between pages.

In Next.js, you can add global CSS files by importing them from `_app.js`. You cannot import global CSS anywhere else.

https://nextjs.org/learn/basics/assets-metadata-css/polishing-layout