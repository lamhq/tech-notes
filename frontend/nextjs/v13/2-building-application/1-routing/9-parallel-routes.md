# Parallel Routes

Parallel Routing allows you to simultaneously or conditionally render one or more pages in the same layout.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fparallel-routes.png&w=3840&q=75&dpl=dpl_Eomhwv8NECRhfPpbG7PmBHVvsZyU)

Parallel Routing allows you to define independent error and loading states for each route as they're being streamed in independently.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fparallel-routes-cinematic-universe.png&w=3840&q=75&dpl=dpl_Eomhwv8NECRhfPpbG7PmBHVvsZyU)


## Convention

Parallel routes are created using named **slots**. Slots are defined with the `@` prefix, and **are passed to the same-level layout as props**.

Slots are _not_ route segments and _do not affect the URL structure_. The file path `/@team/members` would be accessible at `/members`.

For example, the following file structure defines two explicit slots: `@analytics` and `@team`.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fparallel-routes-file-system.png&w=3840&q=75&dpl=dpl_Eomhwv8NECRhfPpbG7PmBHVvsZyU)

The folder structure above means that the component in `app/layout.js` now accepts the `@analytics` and `@team` slots props, and can render them in parallel alongside the `children` prop:

```tsx filename="app/layout.tsx" switcher
export default function Layout(props: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {props.children}
      {props.team}
      {props.analytics}
    </>
  )
}
```


## Unmatched Routes

### `default.js`

You can define a `default.js` file to render as a fallback when Next.js cannot recover a slot's active state based on the current URL.

Consider the following folder structure. The `@team` slot has a `settings` directory, but `@analytics` does not.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fparallel-routes-unmatched-routes.png&w=3840&q=75&dpl=dpl_Eomhwv8NECRhfPpbG7PmBHVvsZyU)

If you were to navigate from the root `/` to `/settings`, the content that gets rendered is different based on the type of navigation and the availability of the `default.js` file.

|                 | With `@analytics/default.js`                         | Without `@analytics/default.js`                   |
| --------------- | ---------------------------------------------------- | ------------------------------------------------- |
| Soft Navigation | `@team/settings/page.js` and `@analytics/page.js`    | `@team/settings/page.js` and `@analytics/page.js` |
| Hard Navigation | `@team/settings/page.js` and `@analytics/default.js` | 404                                               |


## Getting the active route segment in a slot

Both `useSelectedLayoutSegment` and `useSelectedLayoutSegments` accept a `parallelRoutesKey`, which allows you read the active route segment within that slot.

```tsx filename="app/layout.tsx" switcher
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default async function Layout(props: {
  //...
  auth: React.ReactNode
}) {
  const loginSegments = useSelectedLayoutSegment('auth')
  // ...
}
```

When a user navigates to `@auth/login`, or `/login` in the URL bar, `loginSegments` will be equal to the string `"login"`.


## Examples

### Conditional Layouts

Parallel Routes can be used to implement conditional routing. For example, you can render a `@dashboard` or `@login` route depending on the authentication state.

```tsx filename="app/layout.tsx" switcher
import { getUser } from '@/lib/auth'

export default function Layout({
  dashboard,
  login,
}: {
  dashboard: React.ReactNode
  login: React.ReactNode
}) {
  const isLoggedIn = getUser()
  return isLoggedIn ? dashboard : login
}
```
