# Router Cache

*In summary, cache rendered output of route segments.*

Next.js has an in-memory client-side cache that stores the React Server Component Payload, split by individual route segments, for the duration of a user session. This is called the Router Cache.


## How the Router Cache Works

As users navigate between routes, Next.js caches visited route segments and prefetches the routes the user is likely to navigate to (based on `<Link>` components in their viewport).


## Difference between the Router Cache and Full Route Cache

The Router Cache temporarily stores the React Server Component Payload in the browser for the duration of a user session, whereas the Full Route Cache persistently stores the React Server Component Payload and HTML on the server across multiple user requests.

While the Full Route Cache only caches statically rendered routes, the Router Cache applies to both statically and dynamically rendered routes.

## Duration

The cache is stored in the browser's temporary memory. Two factors determine how long the router cache lasts:

- **Session**: The cache persists across navigation. However, it's cleared on page refresh.
- **Automatic Invalidation Period**: The cache of an individual segment is automatically invalidated after a specific time. The duration depends on whether the route is statically or dynamically rendered:
  - **Dynamically Rendered**: 30 seconds
  - **Statically Rendered**: 5 minutes

While a page refresh will clear all cached segments, the **automatic invalidation period** only affects the individual segment from the time it was last accessed or created.

By adding `prefetch={true}` or calling `router.prefetch` for a dynamically rendered route, you can opt into caching for 5 minutes.


## Invalidation

There are two ways you can invalidate the Router Cache:

- In a **Server Action**:
  - Revalidating data on-demand by path with (revalidatePath) or by cache tag with (revalidateTag)
  - Using cookies.set or cookies.delete invalidates the Router Cache to prevent routes that use cookies from becoming stale (e.g. authentication).
- Calling `router.refresh` will invalidate the Router Cache and make a new request to the server for the current route.


## Opting out

It's not possible to opt out of the Router Cache.