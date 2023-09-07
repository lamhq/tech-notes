# Pages

NextAuth.js automatically creates authentication pages for handling Sign in, Sign out, Email Verification and displaying error messages.

## Customization

To add a custom login page, you can use the `pages` option:

```javascript title="pages/api/auth/[...nextauth].js"
...
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
...
```

## Examples

### Email Sign in

If you create a custom sign in form for email sign in, you can use the `signIn()` function which will handle obtaining the CSRF token for you:

```ts
signIn("email", { email: "jsmith@example.com" })
```


### Credentials Sign in

If you create a sign in form for credentials based authentication, you can use the `signIn()` function which will handle obtaining the CSRF token for you:

```ts
signIn("credentials", { username: "jsmith", password: "1234" })
```