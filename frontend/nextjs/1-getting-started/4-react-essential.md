# React Essentials

## Server Components

The main points highlighted as a list:

- React Server Components introduce a new mental model for building hybrid applications that leverage the server and the client.
- React now gives flexibility to choose where to render components based on their purpose.
- Majority of components can be rendered on the server as Server Components. Smaller pieces of interactive UI can be rendered on the client as Client Components.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fthinking-in-server-components.png&w=3840&q=75&dpl=dpl_2R3kjiCD5HGdpH3yxuPw8Jc9nZ2F)


### Why Server Components?

- Server Components leverage server infrastructure to improve performance.
- Data fetching can be moved closer to the database on the server.
- Large dependencies that impact client JavaScript bundle size can be kept on the server.
- Server Components make writing a React application feel similar to PHP or Ruby on Rails.
- With Server Components, the initial page load is faster and the client-side JavaScript bundle size is reduced.
- The base client-side runtime is cacheable and predictable in size. Additional JavaScript is added only when client-side interactivity is used through Client Components.
- All components inside the App Router are Server Components by default


## Client Components

- Client Components enable you to add client-side interactivity to your application.
- In Next.js, they are pre-rendered on the server and hydrated on the client.

### The "use client" directive

The `"use client"` directive is a convention to declare a boundary between a Server and Client Component module graph.

```tsx
'use client'
 
import { useState } from 'react'
 
export default function Counter() {
  const [count, setCount] = useState(0)
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

Once `"use client"` is defined in a file, all other modules imported into it, including child components, are considered part of the client bundle.


## When to use Server and Client Components?

To simplify the decision between Server and Client Components, we recommend using Server Components (default in the `app` directory) until you have a use case for a Client Component.


| What do you need to do?                                                            | Server Component    | Client Component    |
| ---------------------------------------------------------------------------------- | ------------------- | ------------------- |
| Fetch data.                                                                        | Y | N |
| Access backend resources (directly)                                                | Y | N |
| Keep sensitive information on the server (access tokens, API keys, etc)            | Y | N |
| Keep large dependencies on the server / Reduce client-side JavaScript              | Y | N |
| Add interactivity and event listeners (`onClick()`, `onChange()`, etc)             | N | Y |
| Use State and Lifecycle Effects (`useState()`, `useReducer()`, `useEffect()`, etc) | N | Y |
| Use browser-only APIs                                                              | N | Y |
| Use custom hooks that depend on state, effects, or browser-only APIs               | N | Y |
| Use [React Class components](https://react.dev/reference/react/Component)          | N | Y |


## Patterns

### Moving Client Components to the Leaves

For example, you may have a `Layout` that has static elements (e.g. logo, links, etc) and an interactive search bar that uses state.

Instead of making the whole layout a Client Component, move the interactive logic to a Client Component (e.g. `<SearchBar />`) and keep your layout as a Server Component. This means you don't have to send all the component Javascript of the layout to the client.


### Composing Client and Server Components

Server and Client Components can be combined in the same component tree.

Behind the scenes, React handles rendering as follows:

- On the server, React renders **all** Server Components **before** sending the result to the client.
  - This includes Server Components nested inside Client Components.
  - Client Components encountered during this stage are skipped.
- On the client, React renders Client Components and _slots in_ the rendered result of Server Components, merging the work done on the server and client.
  - If any Server Components are nested inside a Client Component, their rendered content will be placed correctly within the Client Component.
 

### Nesting Server Components inside Client Components

#### Unsupported Pattern: Importing Server Components into Client Components

You cannot import a Server Component into a Client Component:

```tsx
'use client'
 
// This pattern will **not** work!
// You cannot import a Server Component into a Client Component.
import ExampleServerComponent from './example-server-component'
 
export default function ExampleClientComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
 
      <ExampleServerComponent />
    </>
  )
}
```

#### Recommended Pattern: Passing Server Components to Client Components as Props

Instead, when designing Client Components you can use React props to mark _"slots"_ for Server Components.

The Server Component will be rendered on the server, and when the Client Component is rendered on the client, the _"slot"_ will be filled in with the rendered result of the Server Component.

A common pattern is to use the React `children` prop to create the _"slot"_. We can refactor `<ExampleClientComponent>` to accept a generic `children` prop and move the import and explicit nesting of `<ExampleClientComponent>` up to a parent component.

```tsx filename="app/example-client-component.tsx" switcher highlight={6,16}
'use client'

import { useState } from 'react'

export default function ExampleClientComponent({
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

In a parent Server Component, you can import both the `<ExampleClientComponent>` and `<ExampleServerComponent>` and pass `<ExampleServerComponent>` as a child of `<ExampleClientComponent>`:

```tsx filename="app/page.tsx"  highlight={11} switcher
// This pattern works:
// You can pass a Server Component as a child or prop of a
// Client Component.
import ExampleClientComponent from './example-client-component'
import ExampleServerComponent from './example-server-component'

// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ExampleClientComponent>
      <ExampleServerComponent />
    </ExampleClientComponent>
  )
}
```

### Passing props from Server to Client Components (Serialization)

Props passed from the Server to Client Components need to be [serializable](https://developer.mozilla.org/en-US/docs/Glossary/Serialization). This means that values such as functions, Dates, etc, cannot be passed directly to Client Components.


### Keeping Server-Only Code out of Client Components

Since JavaScript modules can be shared between both Server and Client Components, it's possible for code that was only ever intended to be run on the server to sneak its way into the client.

For example, take the following data-fetching function:

```ts filename="lib/data.ts" switcher
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })

  return res.json()
}
```


At first glance, it appears that `getData` works on both the server and the client. But because the environment variable `API_KEY` is not prefixed with `NEXT_PUBLIC`, it's a private variable that can only be accessed on the server. Next.js replaces private environment variables with the empty string in client code to prevent leaking secure information.

As a result, even though `getData()` can be imported and executed on the client, it won't work as expected. And while making the variable public would make the function work on the client, it would leak sensitive information.

So, this function was written with the intention that it would only ever be executed on the server.


### The "server only" package

To prevent this sort of unintended client usage of server code, we can use the `server-only` package to give other developers a build-time error if they ever accidentally import one of these modules into a Client Component.

To use `server-only`, first install the package:

```bash filename="Terminal"
yarn add server-only
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


### Data Fetching

Although it's possible to fetch data in Client Components, we recommend fetching data in Server Components unless you have a specific reason for fetching data on the client.

Moving data fetching to the server leads to better performance and user experience.


### Third-party packages

Many components from `npm` packages that use client-only features do not yet have the "use client" directive. If you try to use it directly within a Server Component, you'll see an error:

```tsx
import { Carousel } from 'acme-carousel'
 
export default function Page() {
  return (
    <div>
      <p>View pictures</p>
 
      {/* Error: `useState` can not be used within Server Components */}
      <Carousel />
    </div>
  )
}
```

To fix this, you can wrap third-party components that rely on client-only features in your own Client Components:

```tsx
'use client'
 
import { Carousel } from 'acme-carousel'
 
export default Carousel
```

Now, you can use `<Carousel />` directly within a Server Component.


## Context

### Using context in Client Components

In Next.js 13, context cannot be created or consumed directly within Server Components. To fix this, create your context and render its provider inside of a Client Component:

```tsx
'use client'
 
import { createContext } from 'react'
 
export const ThemeContext = createContext({})
 
export default function ThemeProvider({ children }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

Your Server Component will now be able to directly render your provider since it's been marked as a Client Component:

```tsx
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


### Rendering third-party context providers in Server Components

Many third-party providers won't have added the directive `'use client'` yet. To fix this, wrap third-party providers in your own Client Component:

```tsx
'use client'
 
import { ThemeProvider } from 'acme-theme'
import { AuthProvider } from 'acme-auth'
 
export function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
```

Now, you can import and render `<Providers />` directly within your root layout.

```jsx filename="app/layout.js"
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### Sharing data between Server Components

Since Server Components are not interactive and therefore do not read from React state, you don't need React context to share data. Instead, you can use native JavaScript patterns for common data that multiple Server Components need to access. For example, a module can be used to share a database connection across multiple components:

```ts filename="utils/database.ts" switcher
export const db = new DatabaseConnection()
```

```tsx filename="app/users/layout.tsx" switcher
import { db } from '@utils/database'

export async function UsersLayout() {
  let users = await db.query()
  // ...
}
```

```tsx filename="app/users/[id]/page.tsx" switcher
import { db } from '@utils/database'

export async function DashboardPage() {
  let user = await db.query()
  // ...
}
```

In the above example, both the layout and page need to make database queries. Each of these components shares access to the database by importing the `@utils/database` module. This JavaScript pattern is called global singletons.


### Sharing fetch requests between Server Components

When fetching data, you may want to share the result of a fetch between a page or layout and some of its children components. This is unnecessary.

Instead, we recommend colocating data fetching alongside the component that consumes the data.