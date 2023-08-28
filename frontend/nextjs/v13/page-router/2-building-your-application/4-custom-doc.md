# Custom Document

A custom `Document` can update the `<html>` and `<body>` tags used to render a Page.

To override the default `Document`, create the file `pages/_document` as shown below:

```tsx filename="pages/_document.tsx" switcher
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

- `_document` is only rendered on the server, so event handlers like `onClick` cannot be used in this file.
- `<Html>`, `<Head />`, `<Main />` and `<NextScript />` are required for the page to be properly rendered.