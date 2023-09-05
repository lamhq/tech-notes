# Loading UI and Streaming

The special file `loading.js` helps you create meaningful Loading UI with React Suspense.

With this convention, you can show an instant loading state from the server while the content of a route segment loads.

The new content is automatically swapped in once rendering is complete.


## Instant Loading States

An instant loading state is fallback UI that is shown immediately upon navigation. You can pre-render loading indicators such as skeletons and spinners.

Create a loading state by adding a `loading.js` file inside a folder.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-special-file.png&w=3840&q=75&dpl=dpl_6eHWFFEVzoxL9ig4Y16GwTPFLoXb)

```tsx filename="app/dashboard/loading.tsx" switcher
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />
}
```

In the same folder, `loading.js` will be nested inside `layout.js`. It will automatically wrap the `page.js` file and any children below in a `<Suspense>` boundary.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-overview.png&w=3840&q=75&dpl=dpl_6eHWFFEVzoxL9ig4Y16GwTPFLoXb)



## Server-Side Rendering (SSR) and its limitations

With SSR, there's a series of steps that need to be completed before a user can see and interact with a page:

1. First, all data for a given page is fetched on the server.
1. The server then renders the HTML for the page.
1. The HTML, CSS, and JavaScript for the page are sent to the client.
1. A non-interactive user interface is shown using the generated HTML, and CSS.
1. Finally, React hydrates the user interface to make it interactive.

These steps are sequential and blocking.

SSR with React and Next.js helps improve the perceived loading performance by showing a non-interactive page to the user as soon as possible. However, it can still be slow as all data fetching on server needs to be completed before the page can be shown to the user.


## What is Streaming?

Streaming allows you to break down the page's HTML into smaller chunks and progressively send those chunks from the server to the client.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-with-streaming-chart.png&w=3840&q=75&dpl=dpl_6eHWFFEVzoxL9ig4Y16GwTPFLoXb)

Streaming is particularly beneficial when you want to prevent long data requests from blocking the page from rendering as it can reduce the Time To First Byte (TTFB) and First Contentful Paint (FCP). It also helps improve Time to Interactive (TTI), especially on slower devices.


## Streaming with Suspense

`<Suspense>` works by wrapping a component that performs an asynchronous action (e.g. fetch data), showing fallback UI (e.g. skeleton, spinner) while it's happening, and then swapping in your component once the action completes.

```tsx filename="app/dashboard/page.tsx" switcher
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'

export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
```

By using Suspense, you get the benefits of:

- Streaming Server Rendering - Progressively rendering HTML from the server to the client.
- Selective Hydration - React prioritizes what components to make interactive first based on user interaction.


## SEO

- Next.js will wait for data fetching inside `generateMetadata` to complete before streaming UI to the client. This guarantees the first part of a streamed response includes `<head>` tags.
- Since streaming is server-rendered, it does not impact SEO. You can use the [Mobile Friendly Test](https://search.google.com/test/mobile-friendly) tool from Google to see how your page appears to Google's web crawlers and view the serialized HTML ([source](https://web.dev/rendering-on-the-web/#seo-considerations)).