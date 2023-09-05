# Client API

## Session Object

The session data returned to the client:
```ts
{
  user: {
    name: string
    email: string
    image: string
  },
  expires: Date // This is the expiry of the session, not any of the tokens within the session
}
```

- The session does not contain sensitive information such as the Session Token or OAuth tokens
- It contains a minimal payload that includes enough data needed to display information on a page about the user who is signed in for presentation purposes
- You can use the [session callback](https://next-auth.js.org/configuration/callbacks#session-callback) to customize the session object returned to the client if you need to return additional data in the session object.
- The `expires` value is rotated, meaning whenever the session is retrieved from the REST API, this value will be updated as well, to avoid session expiry.

## useSession() hook

- Client Side: **Yes**
- Server Side: No

The `useSession()` React Hook in the NextAuth.js client is the easiest way to check if someone is signed in.

Make sure that `<SessionProvider>` is added to `pages/_app.js`.

### Example

```jsx
import { useSession } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>
  }

  return <a href="/api/auth/signin">Sign in</a>
}
```

`useSession()` returns an object containing two values: `data` and `status`:

- **`data`**: This can be three values: `Session` / `undefined` / `null`.
  - when the session hasn't been fetched yet, `data` will be `undefined`
  - in case it failed to retrieve the session, `data` will be `null`
  - in case of success, `data` will be `Session`.
- **`status`**: enum mapping to three possible session states: `"loading" | "authenticated" | "unauthenticated"`


## Require session

You can use `useSession` in a way that makes sure you always have a valid session.

If after the initial loading state there was no session found, you can define the appropriate action to respond.

The default behavior is to redirect the user to the sign-in page, You can also define an `onUnauthenticated()` callback, if you would like to do something else:

```jsx title="pages/protected.jsx"
import { useSession } from "next-auth/react"

export default function Admin() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  })

  if (status === "loading") {
    return "Loading or not authenticated..."
  }

  return "User is logged in"
}
```
