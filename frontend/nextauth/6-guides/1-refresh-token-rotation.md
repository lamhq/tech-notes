# Refresh token rotation

## How it works

Refresh token rotation is the practice of updating an `access_token` on behalf of the user, without requiring interaction (eg.: re-sign in).

`access_tokens` are usually issued for a limited time. After they expire, the service verifying them will ignore the value.

Instead of asking the user to sign in again to obtain a new `access_token`, certain providers support exchanging a `refresh_token` for a new access_token, renewing the expiry time.


## Implementation

### 1. Server Side

Using the JWT strategy and session callback.

In the `jwt` callback, we use `refresh_token` obtained from initial login to retrieve new `access_token` (including the new `refresh_token`).

If error happens, it will be attached to the session object (handled in `session` callback).

```js
callbacks: {
  async jwt({ token, account }) {
    if (account) {
      // Save the access token and refresh token in the JWT on the initial login
      return {
        access_token: account.access_token,
        expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
        refresh_token: account.refresh_token,
      }
    } else if (Date.now() < token.expires_at * 1000) {
      // If the access token has not expired yet, return it
      return token
    } else {
      // If the access token has expired, try to refresh it
      try {
        // https://accounts.google.com/.well-known/openid-configuration
        // We need the `token_endpoint`.
        const response = await fetch("https://oauth2.googleapis.com/token", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.GOOGLE_ID,
            client_secret: process.env.GOOGLE_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
          }),
          method: "POST",
        })

        const tokens: TokenSet = await response.json()

        if (!response.ok) throw tokens

        return {
          ...token, // Keep the previous token properties
          access_token: tokens.access_token,
          expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
          // Fall back to old refresh token, but note that
          // many providers may only allow using a refresh token once.
          refresh_token: tokens.refresh_token ?? token.refresh_token,
        }
      } catch (error) {
        console.error("Error refreshing access token", error)
        // The error property will be used client-side to handle the refresh token error
        return { ...token, error: "RefreshAccessTokenError" as const }
      }
    }
  },
  async session({ session, token }) {
    session.error = token.error
    return session
  },
}
```

```ts
declare module "@auth/core/types" {
  interface Session {
    error?: "RefreshAccessTokenError"
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    access_token: string
    expires_at: number
    refresh_token: string
    error?: "RefreshAccessTokenError"
  }
}
```


### 2. Client Side

The `RefreshAccessTokenError` error is passed to the client. This means that you can direct the user to the sign-in flow if we cannot refresh their token.

```js
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const HomePage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (...)
}
```


## Reference

A working example can be accessed [here](https://github.com/nextauthjs/next-auth-refresh-token-example).