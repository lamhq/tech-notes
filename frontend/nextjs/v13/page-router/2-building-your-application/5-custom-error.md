# Custom Errors

## 404 Page

To create a custom 404 page you can create a `pages/404.js` file. This file is statically generated at build time.

```jsx filename="pages/404.js"
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

You can use `getStaticProps` inside this page if you need to fetch data at build time.


## 500 Page

To customize the 500 page you can create a `pages/500.js` file. This file is statically generated at build time.

```jsx filename="pages/500.js"
export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>
}
```

You can use `getStaticProps` inside this page if you need to fetch data at build time.


## Advanced Error Page Customizing

If you wish to override error page, define the file `pages/_error.js` and add the following code:

```jsx
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
```

`_error` is used to define the customized layouts and behaviors of the error pages.

`pages/_error.js` is only used in production. In development you’ll get an error with the call stack to know where the error originated from.

## Reusing the built-in error page

If you want to render the built-in error page you can by importing the `Error` component:

```jsx
import Error from 'next/error'

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const errorCode = res.ok ? false : res.status
  const json = await res.json()

  return {
    props: { errorCode, stars: json.stargazers_count },
  }
}

export default function Page({ errorCode, stars }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return <div>Next stars: {stars}</div>
}
```

The `Error` component also takes `title` as a property if you want to pass in a text message along with a `statusCode`.

`Error` does not currently support Next.js Data Fetching methods like `getStaticProps` or `getServerSideProps`.