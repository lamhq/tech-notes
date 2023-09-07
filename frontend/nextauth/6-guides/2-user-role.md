# Role

This guide helps retrieve the user's role information (from auth provider) and access it in your code.

## Getting the role

We are going to start by adding a `profile()` callback to the providers' config to determine the user role:

```ts title="/pages/api/auth/[...nextauth].ts"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export default NextAuth({
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? "user", ... }
      },
      ...
    })  
  ],
})
```


## Passing the role to session object

By using the `jwt()` callback, on sign-in, the `role` property is exposed from the `profile` callback on the `user` object.

Persist the `user.role` value by assigning it to `token.role`. That's it!

If you also want to use the role on the client, you can expose it via the `session` callback.

```ts title="/pages/api/auth/[...nextauth].ts"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export default NextAuth({
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? "user", ... }
      },
      ...
    })  
  ],
  callbacks: {
    jwt({ token, user }) {
      if(user) token.role = user.role
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    }
  }
})
```

## Using the role

When using the `useSession` hook, `session.user.role` will have the required role if you exposed it via the `session` callback.

```ts title="/pages/admin.tsx"
import { useSession } from "next-auth/react"

export default function Page() {
  const session = await useSession()

  if (session?.user.role === "admin") {
    return <p>You are an admin, welcome!</p>
  }

  return <p>You are not authorized to view this page!</p>
}
```
