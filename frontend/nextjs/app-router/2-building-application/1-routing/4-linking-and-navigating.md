# Linking and Navigating

There are two ways to navigate between routes:

- `<Link>` Component
- `useRouter` Hook

## `<Link>` Component

```tsx filename="app/page.tsx" switcher
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

### Checking Active Links

```jsx filename="app/ui/Navigation.js"
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Navigation({ navLinks }) {
  const pathname = usePathname()

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href)

        return (
          <Link
            className={isActive ? 'text-blue' : 'text-black'}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        )
      })}
    </>
  )
}
```


## Use with Material UI components
With `Button`:
```tsx
<Link href="/about" passHref>
  <Button variant="contained" color="secondary">About</Button>
</Link>
```

With `ListItem`:
```tsx
<Link href="/about" passHref>
 <ListItem button component="a" onClick={onClick}>
  <ListItemText>About</ListItemText>
 </ListItem>
</Link>
```


## `useRouter()` Hook

```jsx filename="app/page.js"
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```


## How Navigation Works

- A route transition is initiated using `<Link>` or calling `router.push()`.
- The router updates the URL in the browser's address bar.
- The router avoids unnecessary work by re-using segments that haven't changed (e.g. shared layouts) from the client-side cache. This is also referred to as partial rendering.
- If the conditions of soft navigation are met, the router fetches the new segment from the cache rather than the server.
- If not, the router performs a hard navigation and fetches the Server Component payload from the server, loading UI is shown from the server while the payload is being fetched.
- The router uses the cached or fresh payload to render the new segments on the client.


### Client-side Caching of Rendered Server Components

- The router uses the cached or fresh payload to render the new segments on the client.
- Next.js has an in-memory client-side cache that stores the rendered results of Server Components. The cache is split by route segments, allowing invalidation at any level and ensuring consistency across concurrent renders.


### Invalidating the Cache

Server Actions can be used to revalidate data on-demand by path (`revalidatePath`) or by cache tag (`revalidateTag`).


### Prefetching

- Prefetching allows preloading a route in the background before it's visited, improving navigation speed.
- By default, routes are prefetched when they become visible in the viewport using the `<Link>` component.
- Routes can also be programmatically prefetched using the `prefetch` method of the `useRouter()` hook.
- Static routes prefetch all Server Component payloads, while dynamic routes prefetch from the first shared layout down until the first `loading.js` file.
- Prefetching is only enabled in production and can be disabled by passing `prefetch={false}` to `<Link>`.


## Soft Navigation

- Soft navigation reuses the cache for changed segments, avoiding new requests to the server for data.
- Soft navigation occurs when the route being navigated to has been prefetched and either doesn't include dynamic segments or has the same dynamic parameters as the current route.
- For example, with the following route `/dashboard/[team]/*`:
  - Navigating from `/dashboard/team-red/*` to `/dashboard/team-red/*` will be a soft navigation.
  - Navigating from `/dashboard/team-red/*` to `/dashboard/team-blue/*` will be a hard navigation.


## Hard Navigation

- Hard navigation involves the cache being invalidated and the server refetching data and re-rendering the changed segments.
- Back and forward navigation have a soft navigation behavior, reusing the client-side cache and providing near-instant navigation.
- By default, Next.js sets focus and scrolls into view the segment that's changed on navigation.