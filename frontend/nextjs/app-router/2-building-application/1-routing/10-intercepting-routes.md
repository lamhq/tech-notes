# Intercepting Routes

Intercepting routes allows you to load a route within the current layout while keeping the context for the current page.

For example, when clicking on a photo from within a feed, a modal overlaying the feed should show up with the photo. In this case, Next.js intercepts the `/feed` route and "masks" this URL to show `/photo/123` instead.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fintercepting-routes-soft-navigate.png&w=3840&q=75&dpl=dpl_FrjGzUDcUzdXs9wvXT4SBxzHoJLD)

However, when navigating to the photo directly by for example when clicking a shareable URL or by refreshing the page, the entire photo page should render instead of the modal. No route interception should occur.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fintercepting-routes-hard-navigate.png&w=3840&q=75&dpl=dpl_FrjGzUDcUzdXs9wvXT4SBxzHoJLD)


## Convention

Intercepting routes can be defined with the `(..)` convention.

You can use:

- `(.)` to match segments on the **same level**
- `(..)` to match segments **one level above**
- `(..)(..)` to match segments **two levels above**
- `(...)` to match segments from the **root** `app` directory

For example, you can intercept the `photo` segment from within the `feed` segment by creating a `(..)photo` directory.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fintercepted-routes-files.png&w=3840&q=75&dpl=dpl_FrjGzUDcUzdXs9wvXT4SBxzHoJLD)


## Examples: Modals

[View an example](https://github.com/vercel-labs/nextgram) of modals with Intercepted and Parallel Routes.