# Data Fetching

There are four ways you can fetch data:

1. On the server, with `fetch`
2. On the server, with third-party libraries
3. On the client, via a Route Handler
4. On the client, with third-party libraries

## 1. Fetching Data on the Server with `fetch`

Next.js extends the native `fetch` Web API to allow you to configure the caching and revalidating behavior for each fetch request on the server.

```tsx filename="app/page.tsx"
async function getData() {
  const res = await fetch('https://api.example.com/...')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()

  return <main></main>
}
```

> To use `async`/`await` in a Server Component with TypeScript, you'll need to use TypeScript `5.1.3` or higher and `@types/react` `18.2.8` or higher.


### Caching Data

Next.js automatically caches the returned values of `fetch` in the Data Cache on the server.

```js
// 'force-cache' is the default, and can be omitted
fetch('https://...', { cache: 'force-cache' })
```

`fetch` requests that use the `POST` method are also automatically cached. Unless it's inside a [Route Handler](/docs/app/building-your-application/routing/route-handlers) that uses the `POST` method, then it will not be cached.


### Revalidating Data

Revalidation is the process of purging the Data Cache and re-fetching the latest data. This is useful when your data changes and you want to ensure you show the latest information.

Cached data can be revalidated in two ways:

- **Time-based revalidation**: Automatically revalidate data after a certain amount of time has passed. This is useful for data that changes infrequently and freshness is not as critical.
- **On-demand revalidation**: Manually revalidate data based on an event (e.g. form submission). On-demand revalidation can use a tag-based or path-based approach to revalidate groups of data at once. This is useful when you want to ensure the latest data is shown as soon as possible (e.g. when content from your headless CMS is updated).


#### Time-based Revalidation

To revalidate data at a timed interval, you can use the `next.revalidate` option of `fetch` to set the cache lifetime of a resource (in seconds).

```js
fetch('https://...', { next: { revalidate: 3600 } })
```

Alternatively, to revalidate all `fetch` requests in a route segment, you can use the Segment Config Options.

```jsx filename="layout.js / page.js"
export const revalidate = 3600 // revalidate at most every hour
```

#### On-demand Revalidation

Data can be revalidated on-demand by path (`revalidatePath`) or by cache tag (`revalidateTag`) inside a Route Handler or a Server Action.

Next.js has a cache tagging system for invalidating `fetch` requests across routes.

1. When using `fetch`, you have the option to tag cache entries with one or more tags.
2. Then, you can call `revalidateTag` to revalidate all entries associated with that tag.

For example, the following `fetch` request adds the cache tag `collection`:

```tsx filename="app/page.tsx"
export default async function Page() {
  const res = await fetch('https://...', { next: { tags: ['collection'] } })
  const data = await res.json()
  // ...
}
```

### Opting out of Data Caching

`fetch` requests are **not** cached if:

- The `cache: 'no-store'` is added to `fetch` requests.
- The `revalidate: 0` option is added to individual `fetch` requests.
- The `fetch` request is inside a Router Handler that uses the `POST` method.
- The `fetch` request comes after the usage of `headers` or `cookies`.
- The `const dynamic = 'force-dynamic'` route segment option is used.
- The `fetchCache` route segment option is configured to skip cache by default.
- The `fetch` request uses `Authorization` or `Cookie` headers and there's an uncached request above it in the component tree.


#### Individual `fetch` Requests

To opt out of caching for individual `fetch` requests, you can set the `cache` option in `fetch` to `'no-store'`. This will fetch data dynamically, on every request.

```js filename="layout.js / page.js"
fetch('https://...', { cache: 'no-store' })
```

#### Multiple `fetch` Requests

If you have multiple `fetch` requests in a route segment (e.g. a Layout or Page), you can configure the caching behavior of all data requests in the segment using the Segment Config Options.

For example, using `const dynamic = 'force-dynamic'` will cause all data to be fetched at request time, and the segment to be rendered dynamically.

```js filename="layout.js / page.js"
// Add
export const dynamic = 'force-dynamic'
```

There's an extensive list of Segment Config options, giving you fine-grained control of static and dynamic behavior of a route segment.


## 2. Fetching data on the Server with third-party libraries

In cases where you're using a third-party library that doesn't support or expose `fetch` (for example, a database, CMS, or ORM client), you can configure the caching and revalidating behavior of those requests using the Route Segment Config Option and React's `cache` function.

Whether the data is cached or not will depend on whether the route segment is statically or dynamically rendered.

If the segment is static (default), the output of the request will be cached and revalidated as part of the route segment.

If the segment is dynamic, the output of the request will _not_ be cached and will be re-fetched on every request when the segment is rendered.

In the example below:

- The `revalidate` option is set to `3600`, meaning the data will be cached and revalidated at most every hour.
- The React `cache` function is used to memoize data requests.

```ts filename="utils/get-item.ts" switcher
import { cache } from 'react'

export const revalidate = 3600 // revalidate the data at most every hour

export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id })
  return item
})
```


## 3. Fetching Data on the Client with Route Handlers

If you need to fetch data in a client component, you can call a Route Handler from the client.

Route Handlers execute on the server and return the data to the client. This is useful when you don't want to expose sensitive information to the client, such as API tokens.

> Since Server Components render on the server, you don't need to call a Route Handler from a Server Component to fetch data. Instead, you can fetch the data directly inside the Server Component.


## 4. Fetching Data on the Client with third-party libraries

You can also fetch data on the client using a third-party library such as SWR or React Query. These libraries provide their own APIs for memoizing requests, caching, revalidating, and mutating data.
