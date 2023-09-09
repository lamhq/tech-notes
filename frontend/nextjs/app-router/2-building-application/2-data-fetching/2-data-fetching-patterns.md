# Data Fetching Patterns

## Fetching Data on the Server

Whenever possible, we recommend fetching data on the server. This allows you to:

- Have direct access to backend data resources (e.g. databases).
- Keep your application more secure by preventing sensitive information, such as access tokens and API keys, from being exposed to the client.
- Fetch data and render in the same environment. This reduces both the back-and-forth communication between client and server, as well as the [work on the main thread](https://vercel.com/blog/how-react-18-improves-application-performance) on the client.
- Perform multiple data fetches with single round-trip instead of multiple individual requests on the client.
- Depending on your region, data fetching can also happen closer to your data source, reducing latency and improving performance.


## Fetch data on demand with `fetch` API

If you need to use the same data (e.g. current user) in multiple components in a tree, you do not have to fetch data globally, nor forward props between components.

Instead, you can use `fetch` or React `cache` in the component that needs the data without worrying about the performance implications of making multiple requests for the same data.

This is possible because `fetch` requests are automatically memoized.


## Streaming

With Server Components and nested layouts, you're able to instantly render parts of the page that do not specifically require data, and show a loading state for parts of the page that are fetching data.

This means the user does not have to wait for the entire page to load before they can start interacting with it.


## Sequential Data Fetching

With sequential data fetching, requests in a route are dependent on each other and therefore create waterfalls. 

There may be cases where you want this pattern because one fetch depends on the result of the other, or you want a condition to be satisfied before the next fetch to save resources.

For example, the `Playlists` component display all playlists of an artist, it will only start fetching data once the `Artist` component has finished fetching data because `Playlists` depends on the `artistID` prop:

```tsx filename="app/artist/page.tsx" switcher
async function Playlists({ artistID }: { artistID: string }) {
  // Wait for the playlists
  const playlists = await getArtistPlaylists(artistID)

  return (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  )
}

export default async function Page({
  params: { username },
}: {
  params: { username: string }
}) {
  // Wait for the artist
  const artist = await getArtist(username)

  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Playlists artistID={artist.id} />
      </Suspense>
    </>
  )
}
```


## Parallel Data Fetching

With parallel data fetching, requests in a route are eagerly initiated and will load data at the same time. 

This reduces client-server waterfalls and the total time it takes to load data.

To fetch data in parallel, you can eagerly initiate requests by defining them outside the components that use the data, then calling them from inside the component

In the example below, the `getArtist` and `getArtistAlbums` functions are defined outside the `Page` component, then called inside the component, and we wait for both promises to resolve:

```tsx filename="app/artist/[username]/page.tsx" switcher
import Albums from './albums'

async function getArtist(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}`)
  return res.json()
}

async function getArtistAlbums(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`)
  return res.json()
}

export default async function Page({
  params: { username },
}: {
  params: { username: string }
}) {
  // Initiate both requests in parallel
  const artistData = getArtist(username)
  const albumsData = getArtistAlbums(username)

  // Wait for the promises to resolve
  const [artist, albums] = await Promise.all([artistData, albumsData])

  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums}></Albums>
    </>
  )
}
```


## Preloading Data

Another way to prevent waterfalls is to use the preload pattern. You can optionally create a `preload` function to further optimize parallel data fetching.

With this approach, you don't have to pass promises down as props.

The `preload` function can also have any name as it's a pattern, not an API.

```tsx filename="components/Item.tsx" switcher
import { getItem } from '@/utils/get-item'

export const preload = (id: string) => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
  void getItem(id)
}
export default async function Item({ id }: { id: string }) {
  const result = await getItem(id)
  // ...
}
```

```tsx filename="app/item/[id]/page.tsx" switcher
import Item, { preload, checkIsAvailable } from '@/components/Item'

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  // starting loading item data
  preload(id)
  // perform another asynchronous task
  const isAvailable = await checkIsAvailable()

  return isAvailable ? <Item id={id} /> : null
}
```


## Using React `cache`, `server-only`, and the Preload Pattern

You can combine the `cache` function, the `preload` pattern, and the `server-only` package to create a data fetching utility that can be used throughout your app.

```ts filename="utils/get-item.ts" switcher
import { cache } from 'react'
import 'server-only'

export const preload = (id: string) => {
  void getItem(id)
}

export const getItem = cache(async (id: string) => {
  // ...
})
```

With this approach, you can eagerly fetch data, cache responses, and guarantee that this data fetching only happens on the server.

The `utils/get-item` exports can be used by Layouts, Pages, or other components to give them control over when an item's data is fetched.

> We recommend using the `server-only` package to make sure server data fetching functions are never used on the client.