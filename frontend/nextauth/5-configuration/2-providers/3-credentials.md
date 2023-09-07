# Credentials

## How it works

The Credentials provider allows you to handle signing in with arbitrary credentials, such as a username and password, two-factor authentication or hardware device.

It is intended to support use cases where you have an existing system you need to authenticate users against.

The Credentials provider can only be used if JSON Web Tokens are enabled for sessions.

Users authenticated with the Credentials provider are not persisted in the database.


## Set up

```js title="pages/api/auth/[...nextauth].js"
import CredentialsProvider from "next-auth/providers/credentials"
...
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // You need to provide your own logic here that takes the credentials
      // submitted and returns either a object representing a user or value
      // that is false/null if the credentials are invalid.
      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // You can also use the `req` object to obtain additional parameters
      // (i.e., the request IP address)
      const res = await fetch("/your/endpoint", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()

      // If no error and we have user data, return it
      if (res.ok && user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
]
...
```


## Username / Password

You need to define a function `authorize()` that accepts credentials (submitted via HTTP POST as input) and request object as parameters.

The function returns either:

- A `user` object, which indicates the credentials are valid.
- If you return `null` then an error will be displayed advising the user to check their details.
- If you throw an Error, the user will be sent to the error page with the error message as a query parameter.

```js title="pages/api/auth/[...nextauth].js"
import CredentialsProvider from "next-auth/providers/credentials";
...
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  })
]
...
```


## Multiple providers

You can specify more than one credentials provider by specifying a unique `id` for each one.

```js
providers: [
  CredentialsProvider({
    id: "domain-login",
    name: "Domain Account",
    async authorize(credentials, req) {
      const user = {
        /* add function to get user */
      }
      return user
    },
    credentials: {
      domain: {
        label: "Domain",
        type: "text ",
        placeholder: "CORPNET",
        value: "CORPNET",
      },
      username: { label: "Username", type: "text ", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
    },
  }),
  CredentialsProvider({
    id: "intranet-credentials",
    name: "Two Factor Auth",
    async authorize(credentials, req) {
      const user = {
        /* add function to get user */
      }
      return user
    },
    credentials: {
      username: { label: "Username", type: "text ", placeholder: "jsmith" },
      "2fa-key": { label: "2FA Key" },
    },
  }),
  /* ... additional providers ... /*/
]
```