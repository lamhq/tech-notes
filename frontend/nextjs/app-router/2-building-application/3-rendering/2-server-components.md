# Server Components

By default, Next.js uses Server Components.


## How are Server Components rendered?

On the server, Next.js uses React's APIs to orchestrate rendering.

The rendering work is split into chunks: by individual route segments and [Suspense Boundaries](https://react.dev/reference/react/Suspense).

Each chunk is rendered in two steps:

1. React renders Server Components into a special data format called the **React Server Component Payload (RSC Payload)**.
2. Next.js uses the RSC Payload and Client Component JavaScript instructions to render **HTML** on the server.

Then, on the client:

1. The HTML is used to immediately show a fast non-interactive preview of the route - this is for the initial page load only.
2. The React Server Components Payload is used to reconcile the Client and Server Component trees, and update the DOM.
3. The JavaScript instructions are used to [hydrate](https://react.dev/reference/react-dom/client/hydrateRoot) Client Components and make the application interactive.


## React Server Component Payload (RSC)

The RSC Payload is a compact binary representation of the rendered React Server Components tree. It's used by React on the client to update the browser's DOM.

The RSC Payload contains:

- The rendered result of Server Components
- Placeholders for where Client Components should be rendered and references to their JavaScript files
- Any props passed from a Server Component to a Client Component


## Rendering Strategies

### Static Rendering (Default)

Routes are rendered at build time, or in the background after data revalidation.

The result is cached and can be pushed to a Content Delivery Network (CDN). 

Static rendering is useful when a route has data that is not personalized to the user and can be known at build time, such as a static blog post or a product page.


### Dynamic Rendering

routes are rendered for each user at **request time**.

Dynamic rendering is useful when a route has data that is personalized to the user or has information that can only be known at request time, such as cookies or the URL's search params.

During rendering, if a dynamic function or uncached data request is discovered, Next.js will switch to dynamically rendering the whole route.

| Dynamic Functions | Data       | Route                |
| ----------------- | ---------- | -------------------- |
| No                | Cached     | Statically Rendered  |
| Yes               | Cached     | Dynamically Rendered |
| No                | Not Cached | Dynamically Rendered |
| Yes               | Not Cached | Dynamically Rendered |

As a developer, you do not need to choose between static and dynamic rendering as Next.js will automatically choose the best rendering strategy for each route based on the features and APIs used. Instead, you choose when to cache or revalidate specific data, and you may choose to stream parts of your UI.

#### Dynamic Functions

Dynamic functions rely on information that can only be known at request time such as a user's cookies, current requests headers, or the URL's search params.

In Next.js, these dynamic functions are:

- `cookies()` and `headers()`: Using these in a Server Component will opt the whole route into dynamic rendering at request time.
- `useSearchParams()`:
    - In Client Components, it'll skip static rendering and instead render all Client Components up to the nearest parent Suspense boundary on the client.
  - We recommend wrapping the Client Component that uses useSearchParams() in a <Suspense/> boundary. This will allow any Client Components above it to be statically rendered. [Example](https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering).
- `searchParams`: Using the Pages prop will opt the page into dynamic rendering at request time.

```tsx
export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <h1>My Page</h1>
}
```

### Streaming

With Streaming, routes are rendered on the server at **request time**. The work is split into chunks and streamed to the client as it becomes ready. This allows the user to see a preview of the page before it's fully rendered.

Streaming is useful for lower-priority UI, or UI that depends on slower data fetches that would block rendering for the whole route. For example, reviews on a product page.

In Next.js, you can stream route segments using [`loading.js`, and UI components with React Suspense](../1-routing/7-loading-ui-and-streaming.md).


## Sharing data between components

When fetching data on the server, there may be cases where you need to share data across different components.

For example, you may have a layout and a page that depend on the same data.

Instead of using React Context or passing data as props, you can use `fetch` or React's `cache` function to fetch the same data in the components that need it, without worrying about making duplicate requests for the same data. This is because React extends `fetch` to automatically memoize data requests, and the `cache` function can be used when `fetch` is not available.


## Keeping Server-only Code out of the Client Environment

We can use the `server-only` package to give other developers a build-time error if they ever accidentally import server modules into a Client Component.

To use `server-only`, first install the package:

```bash filename="Terminal"
npm install server-only
```

Then import the package into any module that contains server-only code:

```js filename="lib/data.js"
import 'server-only'

export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })

  return res.json()
}
```


## Using Third-party Packages

Today, many components from `npm` packages that use client-only features do not yet have the directive `"use client"`.

These third-party components will work as expected within Client Components since they have the `"use client"` directive, but they won't work within Server Components.

You can wrap third-party components that rely on client-only features in your own Client Components:

```tsx filename="app/carousel.tsx" switcher
'use client'

export { Carousel as default } from 'acme-carousel'
```

We don't expect you to need to wrap most third-party components since it's likely you'll be using them within Client Components. However, one exception is providers, since they rely on React state and context, and are typically needed at the root of an application.


## Using Context Providers

Context providers are typically rendered near the root of an application to share global concerns, like the current theme. 

Since React context is not supported in Server Components, trying to create a context at the root of your application will cause an error.

To fix it, create your context and render its provider inside of a Client Component:

```tsx filename="app/theme-provider.tsx" switcher
'use client'

import { createContext } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({ children }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

Your Server Component will now be able to directly render your provider since it's been marked as a Client Component:

```tsx filename="app/layout.tsx" switcher
import ThemeProvider from './theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```