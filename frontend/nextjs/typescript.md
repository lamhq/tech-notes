# TypeScript

## Setup Project

Create an **empty** `tsconfig.json` file in the root of your project:

```sh
touch tsconfig.json
```

Install TypeScript:

```sh
yarn add --dev typescript @types/react @types/node
```

Now, try starting the development server again.

```sh
yarn dev
```

After starting the server, Next.js will:

- Populate the `tsconfig.json` file for you. You may customize this file.
= Create the `next-env.d.ts` file, which ensures Next.js types are picked up by the TypeScript compiler. You should not touch this file.


## Next.js Specific Types

```ts
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps: GetStaticProps = async context => {
  // ...
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
}

export const getServerSideProps: GetServerSideProps = async context => {
  // ...
}
```

```ts
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  // ...
}
```

```ts
// pages/_app.tsx
import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
```
