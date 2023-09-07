# Getting Started

## Installation

### Install NextAuth

```bash npm2yarn2pnpm
yarn add next-auth
```

### Add environment variables

```sh title=".env.local"
# set this environment variable to the canonical URL of your site.
NEXTAUTH_URL="http://localhost:3000"
# you can generate the value using this command: openssl rand -base64 32
NEXTAUTH_SECRET="38I3bqpitbA94d2MpXKSxeNzdTGTA32NYgRd3ny1Te0="

# Go here and create a new OAuth app: https://github.com/settings/apps
GITHUB_ID=""
GITHUB_SECRET=""
```

### Add API route

To add NextAuth.js to a project create a file called `[...nextauth].js` in `pages/api/auth`. This contains the dynamic route handler for NextAuth.js which will also contain all of your global NextAuth.js configurations.

```javascript title="pages/api/auth/[...nextauth].js" showLineNumbers
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
```

#### With App Router

If you're using Nextjs App Router, You can initialize NextAuth.js with a Route Handler:

```javascript title="/app/api/auth/[...nextauth]/route.ts"
import NextAuth from "next-auth"

const handler = NextAuth({
  ...
})

export { handler as GET, handler as POST }
```


### Add `SessionProvider`

To be able to use `useSession` first you'll need to expose the session context, `<SessionProvider />`, at the top level of your application:

```jsx title="pages/_app.jsx" showLineNumbers
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

#### With App Router

Create a client component named `SessionProvider` that export 
from `next-auth/react`

```jsx title="components/SessionProvider.ts"
"use client"
export { SessionProvider as default } from 'next-auth/react';
```

Modify the root layout to import the component:

```jsx title="app/layout.tsx"
import { getServerSession } from 'next-auth'
import SessionProvider from '@/components/SessionProvider'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
        {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

## Authentication in client component

The `useSession()` React Hook in the NextAuth.js client is 
the easiest way to check if someone is signed in.

```jsx title="components/login-btn.jsx" showLineNumbers
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
```


## Authentication in Server Components

```jsx title="pages/api/restricted.js" showLineNumbers
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    return <>{session?.user?.name}</>
  }

  return (
    <>Not logged in</>
  )
}
```


## Authentication in API Route

To protect an API Route, you can use the `getServerSession()` method.

```javascript title="pages/api/restricted.js" showLineNumbers
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}
```


## Deploying to production

When deploying your site set the `NEXTAUTH_URL` environment variable to the canonical URL of the website.

```
NEXTAUTH_URL=https://example.com
```