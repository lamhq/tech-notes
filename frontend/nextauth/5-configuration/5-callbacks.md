# Callbacks

Callbacks are **asynchronous** functions you can use to control what happens when an action is performed.

You can specify a handler for any of the callbacks below.

```js title="pages/api/auth/[...nextauth].js"
...
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
...
}
```

## Sign in callback

Control if a user is allowed to sign in.

```js title="pages/api/auth/[...nextauth].js"
...
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    const isAllowedToSignIn = true
    if (isAllowedToSignIn) {
      return true
    } else {
      // Return false to display a default error message
      return false
      // Or you can return a URL to redirect to:
      // return '/unauthorized'
    }
  }
}
...
```

- When using the **Email Provider** the `signIn()` callback is triggered both when the user makes a **Verification Request** (before they are sent an email with a link that will allow them to sign in) and again _after_ they activate the link in the sign-in email.

  Email accounts do not have profiles in the same way OAuth accounts do. On the first call during email sign in the `email` object will include a property `verificationRequest: true` to indicate it is being triggered in the verification request flow. When the callback is invoked _after_ a user has clicked on a sign-in link, this property will not be present.

  You can check for the `verificationRequest` property to avoid sending emails to addresses or domains on a blocklist (or to only explicitly generate them for email address in an allow list).

* When using the **Credentials Provider** the `user` object is the response returned from the `authorize` callback and the `profile` object is the raw body of the `HTTP POST` submission.


## Redirect callback

The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).


## JWT callback

This callback is called whenever a JSON Web Token is created (i.e. at sign in) 
or updated (i.e whenever a session is accessed in the client).

The returned value will be encrypted, and it is stored in a cookie.


## Session callback

The session callback is called whenever a session is checked.