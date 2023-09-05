# TypeScript

## Extends `Session` type

To extend `Session` type, create a `types/next-auth.d.ts` file in your project:

```ts title="types/next-auth.d.ts"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string
    } & DefaultSession["user"]
  }
}
```
