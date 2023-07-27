# Routing Fundamentals

## The `app` Router

In version 13, Next.js introduced a new **App Router** built on **React Server Components**, which supports shared layouts, nested routing, loading states, error handling, and more.

The App Router works in a new directory named `app`.

The `app` directory works alongside the `pages` directory. This allows you to opt some routes of your application into the new behavior while keeping other routes in the `pages` directory for previous behavior.

The App Router takes priority over the Pages Router.

By default, components inside `app` are React Server Components.


## File-system based router

Next.js uses a file-system based router where:

- Folders are used to define routes. A route is a single path of nested folders, following the file-system hierarchy from the root folder down to a final leaf folder that includes a `page.js` file.
- Files are used to create UI that is shown for a route segment. See special files.


## Route Segments

Each folder in a route represents a **route segment**. Each route segment is mapped to a corresponding **segment** in a **URL path**.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=3840&q=75&dpl=dpl_522AaPJHzLvWPorqr69mJia4bx3d)


## Nested Routes

To create a nested route, you can nest folders inside each other. 

For example, you can add a new `/dashboard/settings` route by nesting two new folders in the `app` directory.

Next.js provides a set of special files to create UI with specific behavior in nested routes:

|                                                                                       |                                                                                                |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `layout`     | Shared UI for a segment and its children                                                       |
| `page`         | Unique UI of a route and make routes publicly accessible                                       |
| `loading`     | Loading UI for a segment and its children                                                      |
| `not-found`                     | Not found UI for a segment and its children                                                    |
| `error`                 | Error UI for a segment and its children                                                        |
| `global-error`          | Global Error UI                                                                                |
| `route`                | Server-side API endpoint                                                                       |
| `template` | Specialized re-rendered Layout UI                                                              |
| `default`                         | Fallback UI for [Parallel Routes] |

`.js`, `.jsx`, or `.tsx` file extensions can be used for special files.


## Component Hierarchy

The React components defined in special files of a route segment are rendered in a specific hierarchy:

- `layout.js`
- `template.js`
- `error.js` (React error boundary)
- `loading.js` (React suspense boundary)
- `not-found.js` (React error boundary)
- `page.js` or nested `layout.js`

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&w=3840&q=75&dpl=dpl_522AaPJHzLvWPorqr69mJia4bx3d)

In a nested route, the components of a segment will be nested **inside** the components of its parent segment.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-file-conventions-component-hierarchy.png&w=3840&q=75&dpl=dpl_522AaPJHzLvWPorqr69mJia4bx3d)


## Custom files

In addition to special files, you have the option to add your own files (e.g. components, styles, tests, etc) inside folders in the `app` directory.


## Server-Centric Routing with Client-side Navigation

1. The App Router in Next.js uses server-centric routing aligned with Server Components and data fetching on the server.
2. Server-centric routing eliminates the need for the client to download a route map, improving performance.
3. The router still allows client-side navigation using the `Link` Component, similar to a Single-Page Application.
4. When navigating to a new route, the browser's URL is updated without reloading the page.
5. Next.js only renders the segments of the page that change, optimizing rendering performance.
6. The router stores the result of React Server Component payloads in an in-memory client-side cache.
7. The cache is split by route segments, allowing for invalidation at any level and ensuring consistency across concurrent renders.
8. Re-using the cache of previously fetched segments can further improve performance in certain cases.


## Partial Rendering

When navigating between sibling routes (e.g. `/dashboard/settings` and `/dashboard/analytics` below), Next.js will only fetch and render the layouts and pages in routes that change.

It will **not** re-fetch or re-render anything above the segments in the subtree. This means that in routes that share a layout, the layout will be preserved when a user navigates between sibling pages.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fpartial-rendering.png&w=3840&q=75&dpl=dpl_522AaPJHzLvWPorqr69mJia4bx3d)


## Advanced Routing Patterns

- Parallel Routes: Allow you to simultaneously show two or more pages in the same view that can be navigated independently. You can use them for split views that have their own sub-navigation. E.g. Viewing an item in a list item page.
- Intercepting Routes: Allow you to intercept a route and show it in the context of another route. You can use these when keeping the context for the current page is important. E.g. Seeing all tasks while editing one task or expanding a photo in a feed.
