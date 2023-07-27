# Basic

## Create project

```sh
yarn create next-app
```

In `package.json`, these scripts refer to the different stages of developing an application:

- `dev` - Runs `next dev` which starts Next.js in development mode
- `build` - Runs `next build` which builds the application for production usage
- `start` - Runs `next start` which starts a Next.js production server


## Pages

Pages are associated with a route based on their **file name**. For example, in development:

- `pages/index.js` is associated with the `/` route.
- `pages/posts/first-post.js` is associated with the `/posts/first-post` route.


## Navigate Between Pages

```js
import Link from 'next/link'
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

## Layout Component

```css
/* components/layout.module.css */
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

```jsx
// components/layout.js
import styles from './layout.module.css'

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>
}
```

```jsx
// pages/posts/first-post.js
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
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


## Pre-rendering

Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

Next.js has two forms of pre-rendering:

- **Static Generation**: is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on each request.

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

On the other hand, **Static Generation** is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use **client-side** JavaScript to populate data.


### Static Generation with Data using `getStaticProps`

When you export a page component, you can also export an async function called `getStaticProps`:

```js
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

`getStaticProps` and `getStaticPaths` runs **only on the server-side**. It will never be run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.

- In development (`npm run dev` or `yarn dev`), `getStaticProps` runs on every request.
- In production, `getStaticProps` runs at build time.

Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.

`getStaticProps` can only be exported from a page. You can’t export it from non-page files.


### Server-Side Rendering

To use Server-side Rendering, you need to export `getServerSideProps`

```js
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

`getServerSideProps`'s parameter (`context`) contains request specific parameters. You should use `getServerSideProps` only if you need to pre-render a page whose data must be fetched at request time. It will be slower than `getStaticProps` because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.


### Client-side Rendering

```js
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```


## Dynamic Routes

### Generating Static Pages with Dynamic Routes

If you want to statically generate a page of a path called `posts/<id>` where `<id>` can be dynamic, then:

- Create a page at `/pages/posts/[id].js`
- `getStaticPaths` which return an array of possible value for id
- `getStaticProps` which fetches necessary data for the post with `id`

```js
// pages/posts/[id].js
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  )
}
```

### Generating Link to dynamic pages

To link to a page with dynamic routes, you need to use the Link component differently:

```js
<Link href="/posts/[id]" as="/posts/ssg-ssr">
  <a>...</a>
</Link>
```

### Fallback

```js
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
```

If `fallback` is `false`, then any paths not returned by `getStaticPaths` will result in a **404 page**.

If `fallback` is `true`, then the behavior of `getStaticProps` changes:

- The paths returned from `getStaticPaths` will be rendered to HTML at build time.
- The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
- In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.


### Catch-all Routes

Dynamic routes can be extended to catch all paths by adding three dots (`...`) inside the brackets. For example:

- `pages/posts/[...id].js` matches `/posts/a`, but also `/posts/a/b`, `/posts/a/b/c` and so on.

If you do this, in `getStaticPaths`, you must return an array as the value of the id key like so:

```js
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c']
    }
  }
  //...
]
```

And `params.id` will be an array in `getStaticProps`:

```js
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```

## 404 Pages

To create a custom 404 page, create `pages/404.js`. This file is statically generated at build time.


## API Routes

API Routes let you create an API endpoint inside a Next.js app. You can do so by creating a function inside the `pages/api` directory that has the following format:

```js
// req = request data, res = response data
export default (req, res) => {
  res.status(200).json({ text: 'Hello' })
}
```

Do Not Fetch an API Route from `getStaticProps` or `getStaticPaths`. Instead, write your server-side code directly in `getStaticProps` or `getStaticPaths` (or call a helper function).

> Next.js’s scope is to UI-rendering, while abstracting away the client/server distinction. If you need "proper" backend logic, such as a database or an accounts server, you should keep that in a separate server application.


## Deploying Your Next.js App

- [Deploy a Next.js app on GitHub to Vercel](https://nextjs.org/learn/basics/deploying-nextjs-app/deploy)
- [Use a custom domain for Vercel app](https://vercel.com/docs/v2/custom-domains)

### Host your Next.js app to Node.js environment

Deploy your code to a hosting provider that supports Node.js.

```sh
npm run build
npm run start
```


