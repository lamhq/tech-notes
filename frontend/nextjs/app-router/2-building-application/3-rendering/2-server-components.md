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