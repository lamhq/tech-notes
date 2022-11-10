# Data Fetching

## `getStaticProps` (Static Generation)

If you export an async function called `getStaticProps` from a page, Next.js will pre-render this page at build time using the props returned by `getStaticProps`.

Because `getStaticProps` runs at build time, it does not receive data that’s only available during request time, such as query parameters or HTTP headers as it generates static HTML.

`getStaticProps` runs only on the server-side. It will never be run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.

`getStaticProps` can only be exported from a page. You can’t export it from non-page files.

In development (next dev), `getStaticProps` will be called on every request.


```ts
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async context => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

// posts will be populated at build time by getStaticProps()
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}
```

The `context` parameter is an object containing the following keys:

- `params` contains the route parameters for pages using dynamic routes. For example, if the page name is `[id].js` , then params will look like `{ id: ... }`.
- `preview` is true if the page is in the preview mode and `undefined` otherwise.
- `previewData` contains the preview data set by `setPreviewData`.
- `locale` contains the active locale (if enabled).
- `locales` contains all supported locales (if enabled).
- `defaultLocale` contains the configured default locale (if enabled).

`getStaticProps` should return an object with:

- `props` - A required object with the props that will be received by the page component. It should be a serializable object
- `revalidate` - An optional amount in seconds after which a page re-generation can occur.
- `notFound` - An optional boolean value to allow the page to return a 404 status and page.
- `redirect` - An optional redirect value to allow redirecting to internal and external resources. It should match the shape of `{ destination: string, permanent: boolean }`

You should use `getStaticProps` if:

- The data required to render the page is available at build time ahead of a user’s request.
- The data can be publicly cached (not user-specific).
- The page must be pre-rendered (for SEO) and be very fast.


## Incremental Static Regeneration

Incremental Static Regeneration allows you to update existing pages by re-rendering them in the background as traffic comes in.

```ts
// pages/posts/[id].js
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  }
}

export default Blog
```

Now the list of blog posts will be revalidated once per second; if you add a new blog post it will be available almost immediately, without having to re-build your app or make a new deployment.


## `getStaticPaths` (Static Generation)

If a page has dynamic routes (documentation) and uses `getStaticProps` it needs to define a list of paths that have to be rendered to HTML at build time.

If you export an `async` function called `getStaticPaths` from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by `getStaticPaths`.

If the page name is `pages/posts/[postId]/[commentId]`, then params should contain `postId` and `commentId`.

```ts
// pages/posts/[id].js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: true or false // See the "fallback" section below
  };
}
```

The object returned by `getStaticPaths` must contain a boolean `fallback` key.

- If `fallback` is `false`, then any paths not returned by `getStaticPaths` will result in a 404 page.
- If `fallback` is `true`, the paths that have not been generated at build time will **not** result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request
- If `fallback` is `'blocking'`, new paths not returned by `getStaticPaths` will wait for the HTML to be generated, identical to SSR, and then be cached for future requests so it only happens once per path.

```ts
// pages/posts/[id].js
import { useRouter } from 'next/router'
import { GetStaticPaths } from 'next'

function Post({ post }) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // Render post...
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return {
    props: { post },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  }
}

export default Post
```


## `getServerSideProps` (Server-side Rendering)

```ts
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('https://.../data')
  const data: Data = await res.json()

  return {
    props: {
      data,
    },
  }
}

```

The `context` parameter is an object containing the following keys:

- `params`: If this page uses a dynamic route, params contains the route parameters. If the page name is `[id].js` , then params will look like `{ id: ... }`.
- `req`: The HTTP IncomingMessage object.
- `res`: The HTTP response object.
- `query`: The query string.
- `preview`: preview is true if the page is in the preview mode and false otherwise.
- `previewData`: The preview data set by setPreviewData.
- `resolvedUrl`: A normalized version of the request URL.
- `locale` contains the active locale (if enabled).
- `locales` contains all supported locales (if enabled).
- `defaultLocale` contains the configured default locale (if enabled).

`getServerSideProps` should return an object with:

- `props` - A required object with the props that will be received by the page component. It should be a serializable object
- `notFound` - An optional boolean value to allow the page to return a 404 status and page.
- `redirect` - An optional redirect value to allow redirecting to internal and external resources. It should match the shape of `{ destination: string, permanent: boolean }`
