# Error Handling

The `error.js` file convention allows you to gracefully handle unexpected runtime errors in [nested routes](/docs/app/building-your-application/routing#nested-routes).

- Automatically wrap a route segment and its nested children in a [React Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).
- Create error UI tailored to specific segments using the file-system hierarchy to adjust granularity.
- Isolate errors to affected segments while keeping the rest of the application functional.
- Add functionality to attempt to recover from an error without a full page reload.

Create error UI by adding an `error.js` file inside a route segment and exporting a React component:

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ferror-special-file.png&w=3840&q=75&dpl=dpl_6eHWFFEVzoxL9ig4Y16GwTPFLoXb)

```tsx filename="app/dashboard/error.tsx" switcher
'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
```

## How `error.js` Works

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ferror-overview.png&w=3840&q=75&dpl=dpl_6eHWFFEVzoxL9ig4Y16GwTPFLoXb)


## Nested Routes

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-error-component-hierarchy.png&w=3840&q=75&dpl=dpl_6eHWFFEVzoxL9ig4Y16GwTPFLoXb)


## Handling Errors in Layouts

`error.js` boundaries do **not** catch errors thrown in `layout.js` or `template.js` components of the **same segment**. This [intentional hierarchy](#nested-routes) keeps important UI that is shared between sibling routes (such as navigation) visible and functional when an error occurs.

To handle errors within a specific layout or template, place an `error.js` file in the layouts parent segment.

To handle errors within the root layout or template, use a variation of `error.js` called `global-error.js`.


## `global-error.js`

The `global-error.js` error boundary wraps the **entire** application, and its fallback component replaces the root layout when active. Because of this, it is important to note that `global-error.js` **must** define its own `<html>` and `<body>` tags.

Even if a `global-error.js` is defined, it is still recommended to define a root `error.js` whose fallback component will be rendered **within** the root layout, which includes globally shared UI and branding.

```tsx filename="app/global-error.tsx" switcher
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```


## Handling Server Errors

If an error is thrown inside a Server Component, Next.js will forward an `Error` object (stripped of sensitive error information in production) to the nearest `error.js` file as the `error` prop.

### Securing Sensitive Error Information

During production, the `Error` object forwarded to the client only includes a generic `message` and `digest` property.

This is a security precaution to avoid leaking potentially sensitive details included in the error to the client.

The `message` property contains a generic message about the error and the `digest` property contains an automatically generated hash of the error that can be used to match the corresponding error in server-side logs.

During development, the `Error` object forwarded to the client will be serialized and include the `message` of the original error for easier debugging.