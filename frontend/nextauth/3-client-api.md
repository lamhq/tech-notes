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
  - if `useSession({ required: true })`, `status` can only be `"loading"` or `"authenticated"`


## Require session

You can use `useSession` in a way that makes sure you always have a valid session.

If after the initial loading state there was no session found, you can define the appropriate action to respond.

The default behavior is to redirect the user to the sign-in page, You can also define an `onUnauthenticated()` callback, if you would like to do something else:

```jsx title="pages/protected.jsx"
import { useSession } from "next-auth/react"

export default function Admin() {
  const { status } = useSession({
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
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


## Client authentication

Due to the way Next.js handles `getServerSideProps` / `getInitialProps`, every protected page load has to make a server-side request to check if the session is valid and then generate the requested page. 

This alternative solution allows for showing a loading state on the initial check and every page transition afterward will be client-side, without having to check with the server and regenerate pages.

```js title="pages/admin.jsx"
export default function AdminDashboard() {
  const { data: session } = useSession()
  // session is always non-null inside this page, all the way down the React tree.
  return "Some super secret dashboard"
}

AdminDashboard.auth = true
```

```jsx title="pages/_app.jsx"
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}
```

It can be easily extended/modified to support something like an options object for role based authentication on pages. An example:

```jsx title="pages/admin.jsx"
AdminDashboard.auth = {
  role: "admin",
  loading: <AdminLoadingSkeleton />,
  unauthorized: "/login-with-different-user", // redirect to this url
}
```

Because of how `_app` is written, it won't unnecessarily contact the `/api/auth/session` endpoint for pages that do not require authentication.


### Updating the session

The `useSession()` hook exposes a `update(data?: any): Promise<Session | null>` method that can be used to update the session, without reloading the page.

You can optionally pass an arbitrary object as the first argument, which will be accessible on the server to merge with the session object.

If you are not passing any argument, the session will be reloaded from the server. (This is useful if you want to update the session after a server-side mutation, like updating in the database.)

```tsx title="pages/profile.tsx"
import { useSession } from "next-auth/react"

export default function Page() {
  const { data: session, status, update } = useSession()

  if (status === "authenticated") {
    return (
      <>
        <p>Signed in as {session.user.name}</p>
        
        {/* Update the value by sending it to the backend. */}
        <button onClick={() => update({ name: "John Doe" })}>
          Edit name
        </button>
        {/*
          * Only trigger a session update, assuming you already updated the value server-side.
          * All `useSession().data` references will be updated.
          */}
        <button onClick={() => update()}>
          Edit name
        </button>
      </>
    )
  }

  return <a href="/api/auth/signin">Sign in</a>
}
```


## getSession()

- Client Side: **Yes**
- Server Side: **No**

NextAuth.js provides a `getSession()` helper which should be called **client side only** to return the current active session.

On the server side, **this is still available to use**, however, we recommend using `getServerSession` going forward. The idea behind this is to avoid an additional unnecessary `fetch` call on the server side.

This helper is helpful in case you want to read the session outside of the context of React.

When called, `getSession()` will send a request to `/api/auth/session` and returns a promise with a session object, or `null` if no session exists.

```js
async function myFunction() {
  const session = await getSession()
  /* ... */
}
```


## getProviders()

- Client Side: **Yes**
- Server Side: **Yes**

The `getProviders()` method returns the list of providers currently configured for sign in.

It calls `/api/auth/providers` and returns a list of the currently configured authentication providers.

It can be useful if you are creating a dynamic custom sign in page.


## signIn()

- Client Side: **Yes**
- Server Side: No

Using the `signIn()` method ensures the user ends back on the page they started on after completing a sign in flow.

It will also handle CSRF Tokens for you automatically when signing in with email.


### Redirects to sign in page when clicked

```js
import { signIn } from "next-auth/react"

export default () => <button onClick={() => signIn()}>Sign in</button>
```


### Redirect to OAuth sign-in page when clicked

By default, when calling the `signIn()` method with no arguments, you will be redirected to the NextAuth.js sign-in page.

If you want to skip that and get redirected to your provider's page immediately, call the `signIn()` method with the provider's `id`.

For example to sign in with Google:

```js
import { signIn } from "next-auth/react"

export default () => (
  <button onClick={() => signIn("google")}>Sign in with Google</button>
)
```


### Starts Email sign-in flow when clicked

When using it with the email flow, pass the target `email` as an option.

```js
import { signIn } from "next-auth/react"

export default ({ email }) => (
  <button onClick={() => signIn("email", { email })}>Sign in with Email</button>
)
```


### `callbackUrl` after signing in

The `callbackUrl` specifies to which URL the user will be redirected after signing in. Defaults to the page URL the sign-in is initiated from.

You can specify a different `callbackUrl` by specifying it as the second argument of `signIn()`. This works for all providers.

e.g.

- `signIn(undefined, { callbackUrl: '/foo' })`
- `signIn('google', { callbackUrl: 'http://localhost:3000/bar' })`
- `signIn('email', { email, callbackUrl: 'http://localhost:3000/foo' })`


The URL by default must be an absolute URL at the same host name, or a relative url starting with a slash. If it does not match it will redirect to the homepage.


### Disable redirection

In some cases, you might want to deal with the sign in response on the same page and disable the default redirection.

For that, you can pass `redirect: false` in the second parameter object.

- `signIn('credentials', { redirect: false, password: 'password' })`
- `signIn('email', { redirect: false, email: 'bill@fillmurray.com' })`

If `redirect` is `false`, `signIn` will then return a Promise, that resolves to the following:

```ts
{
  /**
   * Will be different error codes,
   * depending on the type of error.
   */
  error: string | undefined
  /**
   * HTTP status code,
   * hints the kind of error that happened.
   */
  status: number
  /**
   * `true` if the signin was successful
   */
  ok: boolean
  /**
   * `null` if there was an error,
   * otherwise the url the user
   * should have been redirected to.
   */
  url: string | null
}
```


## signOut()

- Client Side: **Yes**
- Server Side: No

In order to logout, use the `signOut()` method to ensure the user ends back on the page they started on after completing the sign out flow.

It reloads the page in the browser when complete.

```js
import { signOut } from "next-auth/react"

export default () => <button onClick={() => signOut()}>Sign out</button>
```

### Specifying a `callbackUrl`

You can specify a `callbackUrl` parameter by passing it as an option.

e.g. `signOut({ callbackUrl: 'http://localhost:3000/foo' })`

The URL must be considered valid by the redirect callback handler). By default, it requires the URL to be an absolute URL at the same host name, or you can also supply a relative URL starting with a slash. If it does not match it will redirect to the homepage. You can define your own [redirect callback](/configuration/callbacks#redirect-callback) to allow other URLs.


### Disable redirection

If you pass `redirect: false` to `signOut`, the page will not reload.

The session will be deleted, and the `useSession` hook is notified, so any indication about the user will be shown as logged out automatically.


## SessionProvider

Using the supplied `<SessionProvider>` allows instances of `useSession()` to share the session object across components

```jsx title="pages/_app.js"
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider
      session={session}
      // In case you use a custom path and your app lives at "/cool-app" rather than at the root "/"
      basePath="cool-app"
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}
    >
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

### Refetch interval

The `refetchInterval` option can be used to contact the server to avoid a session expiring.

When `refetchInterval` is set to `0` (the default) there will be no session polling.

If set to any value other than zero, it specifies in seconds how often the client should contact the server to update the session state. If the session state has expired when it is triggered, all open tabs/windows will be updated to reflect this.

The value for `refetchInterval` should always be lower than the value of the session `maxAge` session option.

By default, session polling will keep trying, even when the device has no internet access. To circumvent this, you can also set `refetchWhenOffline` to `false`.


#### Refetch On Window Focus

The `refetchOnWindowFocus` option can be used to control whether it automatically updates the session state when you switch a focus on tabs/windows.

When `refetchOnWindowFocus` is set to `true` (the default) tabs/windows will be updated and initialize the components' state when they gain or lose focus.

However, if it was set to `false`, it stops re-fetching the session and the components will stay as it is.


### Custom base path
When your Next.js application uses a custom base path, set the `NEXTAUTH_URL` environment variable to the route to the API endpoint in full.

Also, make sure to pass the `basePath` page prop to the `<SessionProvider>`

```
NEXTAUTH_URL=https://example.com/custom-route/api/auth
```

```jsx title="pages/_app.js"
import { SessionProvider } from "next-auth/react"
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} basePath="/custom-route/api/auth">
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```