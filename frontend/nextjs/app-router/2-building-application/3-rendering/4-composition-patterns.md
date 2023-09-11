# Composition Patterns

## When to use Server and Client Components?

Here's a quick summary of the different use cases for Server and Client Components:

| What do you need to do?                                                            | Server Component    | Client Component    |
| ---------------------------------------------------------------------------------- | ------------------- | ------------------- |
| Fetch data                                                                         | Yes | No |
| Access backend resources (directly)                                                | Yes | No |
| Keep sensitive information on the server (access tokens, API keys, etc)            | Yes | No |
| Keep large dependencies on the server / Reduce client-side JavaScript              | Yes | No |
| Add interactivity and event listeners (`onClick()`, `onChange()`, etc)             | No | Yes |
| Use State and Lifecycle Effects (`useState()`, `useReducer()`, `useEffect()`, etc) | No | Yes |
| Use browser-only APIs                                                              | No | Yes |
| Use custom hooks that depend on state, effects, or browser-only APIs               | No | Yes |
| Use React Class components          | No | Yes |


## Interleaving Server and Client Components

Since Client Components are rendered after Server Components, you cannot import a Server Component into a Client Component module.

Instead, you can pass a Server Component as `props` to a Client Component.

A common pattern is to use the React `children` prop to create a _"slot"_ in your Client Component.

In the example below, `<ClientComponent>` accepts a `children` prop:

```tsx filename="app/client-component.tsx" switcher highlight={6,15}
'use client'

import { useState } from 'react'

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {children}
    </>
  )
}
```

`<ClientComponent>` doesn't know that `children` will eventually be filled in by the result of a Server Component. The only responsibility `<ClientComponent>` has is to decide **where** `children` will eventually be placed.

In a parent Server Component, you can import both the `<ClientComponent>` and `<ServerComponent>` and pass `<ServerComponent>` as a child of `<ClientComponent>`:

```tsx filename="app/page.tsx"  highlight={11} switcher
// This pattern works:
// You can pass a Server Component as a child or prop of a
// Client Component.
import ClientComponent from './client-component'
import ServerComponent from './server-component'

// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```

With this approach, `<ClientComponent>` and `<ServerComponent>` are decoupled and can be rendered independently. In this case, the child `<ServerComponent>` can be rendered on the server, well before `<ClientComponent>` is rendered on the client.
