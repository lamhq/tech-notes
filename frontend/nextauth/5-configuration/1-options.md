# Configuration

## Initialization

The main entry point of NextAuth.js is the `NextAuth` method that you import from `next-auth`. It handles different types of requests.

When you define a `/pages/api/auth/[...nextauth]` JS/TS file, you instruct NextAuth.js that every API request beginning with `/api/auth/*` should be handled by the code written in the `[...nextauth]` file.


### Simple initialization

```ts title="/pages/api/auth/[...nextauth].ts"
import NextAuth from "next-auth"

export default NextAuth({
  providers: [],
  secret: '',
  ...
})
```


## Auth options

Options are passed to NextAuth.js when initializing it in an API route.

### providers

An array of authentication providers for signing in.

- Default value: `[]`
- Required: _Yes_

### secret

A random string is used to hash tokens, sign/encrypt cookies and generate cryptographic keys.

- Default value: `string` (_SHA hash of the "options" object_) in development, no default in production.
- Required: _Yes, in production!_

### session

The `session` object.

- Default value: `object`
- Required: _No_

```js
session: {
  // Choose how you want to save the user session.
  // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
  // If you use an `adapter` however, we default it to `"database"` instead.
  // You can still force a JWT session by explicitly defining `"jwt"`.
  // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  // which is used to look up the session in the database.
  strategy: "database",

  // Seconds - How long until an idle session expires and is no longer valid.
  maxAge: 30 * 24 * 60 * 60, // 30 days

  // Seconds - Throttle how frequently to write to database to extend a session.
  // Use it to limit write operations. Set to 0 to always update the database.
  // Note: This option is ignored if using JSON Web Tokens
  updateAge: 24 * 60 * 60, // 24 hours
  
  // The session token is usually either a random UUID or string, however if you
  // need a more customized session token string, you can define your own generate function.
  generateSessionToken: () => {
    return randomUUID?.() ?? randomBytes(32).toString("hex")
  }
}
```

### jwt

- **Default value**: `object`
- **Required**: _No_

JSON Web Tokens can be used for session tokens if enabled with `session: { strategy: "jwt" }` option.

JSON Web Tokens are enabled by default if you have not specified an adapter. 

JSON Web Tokens are encrypted (JWE) by default. We recommend you keep this behaviour.

### pages

- Default value: `{}`
- Required: _No_

Specify URLs to be used if you want to create custom sign in, sign out and error pages.

Pages specified will override the corresponding built-in page.

_For example:_

```js
pages: {
  signIn: '/auth/signin',
  signOut: '/auth/signout',
  error: '/auth/error', // Error code passed in query string as ?error=
  verifyRequest: '/auth/verify-request', // (used for check email message)
  newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
}
```


### debug

- Default value: `false`
- Required: _No_

Set debug to `true` to enable debug messages for authentication and database operations.
