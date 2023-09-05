# Route Handlers

Route Handlers allow you to create custom request handlers for a given route using the Web [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) APIs.

Route Handlers are only available inside the `app` directory

You **do not** need to use API Routes (in `pages` directory) and Route Handlers together.


## Convention

Route Handlers are defined in a `route.js|ts` file inside the `app` directory:

```ts filename="app/api/route.ts" switcher
export async function GET(request: Request) {}
```

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-special-file.png&w=3840&q=75&dpl=dpl_FrjGzUDcUzdXs9wvXT4SBxzHoJLD)

Route Handlers can be nested inside the `app` directory


## Supported HTTP Methods

`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`


## Static Route Handlers

```ts filename="app/items/route.ts" switcher
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()

  return NextResponse.json({ data })
}
```

## Dynamic Route Handlers

Route handlers are evaluated dynamically when:

- Using the `Request` object with the `GET` method.
- Using any of the other HTTP methods.
- Using Dynamic Functions like `cookies` and `headers`.
- The Segment Config Options manually specifies dynamic mode.

For example:

```ts filename="app/products/api/route.ts" switcher
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const product = await res.json()

  return NextResponse.json({ product })
}
```

## Dynamic Functions

### Cookies

- You can read cookies with `cookies()` from `next/headers`.
- To set cookies, you need to return a new `Response` using the `Set-Cookie` header.

```ts filename="app/api/route.ts" switcher
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token.value}` },
  })
}
```

Alternatively:

```ts filename="app/api/route.ts" switcher
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')
}
```

### Headers

- You can read headers with `headers()` from `next/headers`.
- To set headers, you need to return a new `Response` with new `headers`.

```ts filename="app/api/route.ts" switcher
import { headers } from 'next/headers'

export async function GET(request: Request) {
  const headersList = headers()
  const referer = headersList.get('referer')

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { referer: referer },
  })
}
```

Alternatively:

```ts filename="app/api/route.ts" switcher
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
}
```


## Redirects

```ts filename="app/api/route.ts" switcher
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  redirect('https://nextjs.org/')
}
```


## Dynamic Route Segments


```ts filename="app/items/[slug]/route.ts" switcher
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug // 'a', 'b', or 'c'
}
```


## Request Body

You can read the `Request` body using the standard Web API methods:

```ts filename="app/items/route.ts" switcher
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const res = await request.json()
  return NextResponse.json({ res })
}
```


## Request Body FormData

You can read the `FormData` using the the `request.formData()` function:

```ts filename="app/items/route.ts" switcher
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  return NextResponse.json({ name, email })
}
```


## CORS

You can set CORS headers on a `Response` using the standard Web API methods:

```ts filename="app/api/route.ts" switcher
export async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```


### Non-UI Responses

You can use Route Handlers to return non-UI content. Note that [`sitemap.xml`](/docs/app/api-reference/file-conventions/metadata/sitemap#generate-a-sitemap), [`robots.txt`](/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file), [`app icons`](/docs/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx), and [open graph images](/docs/app/api-reference/file-conventions/metadata/opengraph-image) all have built-in support.

```ts filename="app/rss.xml/route.ts" switcher
export async function GET() {
  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>Next.js Documentation</title>
  <link>https://nextjs.org/docs</link>
  <description>The React Framework for the Web</description>
</channel>

</rss>`)
}
```
