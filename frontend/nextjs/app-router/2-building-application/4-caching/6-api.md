# Cache APIs

## `router.refresh`

The `refresh` option of the `useRouter` hook can be used to manually refresh a route.

This completely clears the Router Cache, and makes a new request to the server for the current route.


## `fetch`

Data returned from `fetch` is automatically cached in the Data Cache.

```jsx
// Cached by default. `force-cache` is the default option and can be ommitted.
fetch(`https://...`, { cache: 'force-cache' })
```

### `cache: 'no-store'`

You can opt out individual `fetch` requests of data caching by setting the `cache` option to `no-store`:

```jsx
// Opt out of caching
fetch(`https://...`, { cache: 'no-store' })
```

Using `cache: 'no-store'` will also skip the Full Route Cache for the route where the `fetch` request is used.


### `next.revalidate`

You can use the `next.revalidate` option of `fetch` to set the revalidation period (in seconds) of an individual `fetch` request. 

```jsx
// Revalidate at most after 1 hour
fetch(`https://...`, { next: { revalidate: 3600 } })
```

### `fetch options.next.tags` and `revalidateTag`

Next.js has a cache tagging system for fine-grained data caching and revalidation.

1. When using `fetch` or `unstable_cache`, you have the option to tag cache entries with one or more tags.
2. Then, you can call `revalidateTag` to purge the cache entries associated with that tag.

For example, you can set a tag when fetching data:

```jsx
// Cache data with a tag
fetch(`https://...`, { next: { tags: ['a', 'b', 'c'] } })
```

Then, call `revalidateTag` with a tag to purge the cache entry:

```jsx
// Revalidate entries with a specific tag
revalidateTag('a')
```

There are two places you can use `revalidateTag`, depending on what you're trying to achieve:

- **Route Handlers** - to revalidate data in response of a third party event (e.g. webhook). This will not invalidate the Router Cache immediately as the Router Handler isn't tied to a specific route.
- **Server Actions** - to revalidate data after a user action (e.g. form submission). This will invalidate the Router Cache for the associated route.


## `revalidatePath`

`revalidatePath` allows you manually revalidate data **and** re-render the route segments below a specific path in a single operation. Calling `revalidatePath` methods revalidate the Data Cache, which in turn invalidates the Full Route Cache.

```jsx
revalidatePath('/')
```

There are two places you can use `revalidatePath`:

- Route Handlers
- Server Actions 


## Segment Config Options

The following Route Segment Config options will opt out of the Data Cache and Full Route Cache:

- `const dynamic = 'force-dynamic'`
- `const revalidate = 0`


## `generateStaticParams`

For dynamic segments (e.g. `app/blog/[slug]/page.js`), paths provided by `generateStaticParams` are cached in the Full Route Cache at build time.

Next.js will also cache paths that weren't known at build time the first time they're visited.

You can disable caching at request time by using `export const dynamicParams = false` option in a route segment. When this config option is used, only paths provided by `generateStaticParams` will be served, and other routes will 404 or match (in the case of catch-all routes).


## React `cache` function

The React `cache` function allows you to memoize the return value of a function, allowing you to call the same function multiple times while only executing it once.

```tsx filename="utils/get-item.ts" switcher
import { cache } from 'react'
import db from '@/lib/db'

export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id })
  return item
})
```