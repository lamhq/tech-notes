# Full Route Cache

*In summary, cache rendered output of routes.*

To understand how the Full Route Cache works, it's helpful to look at how React handles rendering, and how Next.js caches the result:

## 1. React Rendering on the Server

The rendering work is split into chunks: by individual routes segments and Suspense boundaries.

Each chunk is rendered in two steps:

1. React renders Server Components into a special data format, optimized for streaming, called the **React Server Component Payload**.
2. Next.js uses the React Server Component Payload and Client Component JavaScript instructions to render **HTML** on the server.


## 2. Next.js Caching on the Server (Full Route Cache)

The default behavior of Next.js is to cache the rendered result (React Server Component Payload and HTML) of a route on the server.

This applies to statically rendered routes at build time, or during revalidation.


## 3. React Hydration and Reconciliation on the Client

At request time, on the client:

1. The HTML is used to immediately show a fast non-interactive initial preview of the Client and Server Components.
2. The React Server Components Payload is used to reconcile the Client and rendered Server Component trees, and update the DOM.
3. The JavaScript instructions are used to hydrate Client Components and make the application interactive.


## 4. Next.js Caching on the Client (Router Cache)

The React Server Component Payload is stored in the client-side Router Cache - a separate in-memory cache, split by individual route segment.

This Router Cache is used to improve the navigation experience by storing previously visited routes and prefetching future routes.


## 5. Subsequent Navigations

On subsequent navigations or during prefetching, Next.js will check if the React Server Components Payload is stored in Router Cache. If so, it will skip sending a new request to the server.

If the route segments are not in the cache, Next.js will fetch the React Server Components Payload from the server, and populate the Router Cache on the client.


## Static and Dynamic Rendering

Whether a route is cached or not at build time depends on whether it's statically or dynamically rendered.

Static routes are cached by default, whereas dynamic routes are rendered at request time, and not cached.

## Duration

By default, the Full Route Cache is persistent.

This means that the render output is cached across user requests.

## Invalidation

There are two ways you can invalidate the Full Route Cache:

- **Revalidating Data**: Revalidating the Data Cache, will in turn invalidate the Router Cache by re-rendering components on the server and caching the new render output.
- **Redeploying**: Unlike the Data Cache, which persists across deployments, the Full Route Cache is cleared on new deployments.


## Opting out

You can opt out of the Full Route Cache, or in other words, dynamically render components for every incoming request, by:

- **Using a Dynamic Function**: This will opt the route out from the Full Route Cache and dynamically render it at request time. The Data Cache can still be used.
- Using the `dynamic = 'force-dynamic'` or `revalidate = 0` **route segment config options**: This will skip the Full Route Cache and the Data Cache. Meaning components will be rendered and data fetched on every incoming request to the server. The Router Cache will still apply as it's a client-side cache.
- **Opting out of the Data Cache**: If a route has a `fetch` request that is not cached, this will opt the route out of the Full Route Cache. The data for the specific `fetch` request will be fetched for every incoming request. Other `fetch` requests that do not opt out of caching will still be cached in the Data Cache. This allows for a hybrid of cached and uncached data.
