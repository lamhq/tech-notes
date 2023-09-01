# Preview Mode

When you’re writing a draft on your headless CMS and want to preview the draft immediately on your page.

You’d want Next.js to render these pages at request time instead of build time and fetch the draft content instead of the published content. You’d want Next.js to bypass Static Generation only for this specific case.

Next.js has a feature called Preview Mode which solves this problem. Here are instructions on how to use it.

The process is:

1. Enable preview mode for a specific draft item (in a secure way).
2. When accessing the preview page of a draft item, if preview mode is enable for that item, we retrive the item and display it like a normal item.


## Step 1: Create a preview API route

First, create a **preview API route**.

In this API route, you need to call `setPreviewData` on the response object. The argument for `setPreviewData` should be an object, and this can be used by `getStaticProps`.

```js filename="pages/api/preview.js"
// simple example for testing it manually from your browser.
export default function handler(req, res) {
  res.setPreviewData({})
  res.end('Preview mode enabled')
}
```

`res.setPreviewData` sets some **cookies** on the browser which turns on the preview mode.

Any requests to Next.js containing these cookies will be considered as the **preview mode**, and the behavior for statically generated pages will change.

> If you open your browser’s developer tools and visit `/api/preview`, you’ll notice that the `__prerender_bypass` and `__next_preview_data` cookies will be set on this request.

### Securely accessing preview API

In practice, you’d want to call this API route securely to enable preview mode. You should create a secret token string and allow pasing this secret when calling the preview API.

Also, you can pass to preview API an argument that specify the page you want to enable preview:

```
https://<your-site>/api/preview?secret=<token>&slug=<path>
```

- `<token>` should be replaced with the secret token you generated.
- `<path>` should be the path for the page that you want to preview. If you want to preview `/posts/foo`, then you should use `&slug=/posts/foo`.

**Finally**, in the preview API route:

- Check that the secret matches and that the `slug` parameter exists (if not, the request should fail).
- Call `res.setPreviewData`.
- Then redirect the browser to the path specified by `slug`. (The following example uses a [307 redirect](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307)).

```js
export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== 'MY_SECRET_TOKEN' || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const post = await getPostBySlug(req.query.slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(post.slug)
}
```


## Step 2: Update `getStaticProps`

The next step is to update `getStaticProps` of the preview page to support the preview mode.

If you request a page which has `getStaticProps` with the preview mode cookies set, then `getStaticProps` will be called at **request time** (instead of at build time).

Furthermore, it will be called with a `context` object where:

- `context.preview` will be `true`.
- `context.previewData` will be the same as the argument when called `setPreviewData`.

```js
export async function getStaticProps(context) {
  // If you request this page with the preview mode cookies set:
  //
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
}
```

We used `res.setPreviewData({})` in the preview API route, so `context.previewData` will be `{}`. You can use this to pass session information from the preview API route to `getStaticProps` if necessary.

If you’re also using `getStaticPaths`, then `context.params` will also be available.

### Fetch preview data

You can update `getStaticProps` to fetch different data based on `context.preview` and/or `context.previewData`.

> For example, your backend API may have different parameter for draft posts. If so, you can use `context.preview` to modify the parameter to include draft posts.

```js
export async function getStaticProps(context) {
  // If context.preview is true, append "/preview" to the API endpoint
  // to request draft data instead of published data. This will vary
  // based on which headless CMS you're using.
  const res = await fetch(`https://.../${context.preview ? 'preview' : ''}`)
  // ...
}
```


## More Details

### Specify the Preview Mode duration

`setPreviewData` takes an optional second parameter which should be an options object. It accepts the following keys:

- `maxAge`: Specifies the number (in seconds) for the preview session to last for.
- `path`: Specifies the path the cookie should be applied under. Defaults to `/` enabling preview mode for all paths.

```js
setPreviewData(data, {
  maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
  path: '/about', // The preview mode cookies apply to paths with /about
})
```


### Clear the Preview Mode cookies

By default, no expiration date is set for Preview Mode cookies, so the preview session ends when the browser is closed.

To clear the Preview Mode cookies manually, create an API route that calls `clearPreviewData()`:

```js filename="pages/api/clear-preview-mode-cookies.js"
export default function handler(req, res) {
  res.clearPreviewData({})
}
```

Then, send a request to `/api/clear-preview-mode-cookies` to invoke the API Route. If calling this route using `next/link`, you must pass `prefetch={false}` to prevent calling `clearPreviewData` during link prefetching.

If a path was specified in the `setPreviewData` call, you must pass the same path to `clearPreviewData`:

```js filename="pages/api/clear-preview-mode-cookies.js"
export default function handler(req, res) {
  const { path } = req.query

  res.clearPreviewData({ path })
}
```

### Works with `getServerSideProps`

The preview mode works on `getServerSideProps` as well. It will also be available on the `context` object containing `preview` and `previewData`.
