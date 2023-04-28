# `<Suspense>`

`<Suspense>` lets you display a fallback until its children have finished loading.

```jsx
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

Suspense in React 18 works best when combined with the transition API. If you suspend during a transition, React will prevent already-visible content from being replaced by a fallback. Instead, React will delay the render until enough data has loaded to prevent a bad loading state.


## Props 

- `children`: The actual UI you intend to `render`. If children suspends while rendering, the Suspense boundary will switch to rendering `fallback`.
- `fallback`: An alternate UI to render in place of the actual UI if it has not finished loading.


## Note

Only Suspense-enabled data sources will activate the Suspense component. They include:

- Data fetching with Suspense-enabled frameworks like `Relay` and `Next.js`
- Lazy-loading component code with `lazy`


## Usage

### Displaying a fallback while content is loading

```jsx
<Suspense fallback={<Loading />}>
  <Albums />
</Suspense>
```

```jsx
function Loading() {
  return <h2>🌀 Loading...</h2>;
}
```

For a component to be able to use `Suspense`, its behavior has to follow these guidelines:
- if the data is not loaded yet, the component should throw a Promise
- if the data is failed to load, the component should throw an error (or anything that is not a promise)
- if the data is loaded successfully, the component should return jsx

Here's an example code of a component that is compatible with `<Suspense>`:

```jsx
import { fetchData, useSuspense } from './data.js';

export default function Albums({ id }) {
  const albums = useSuspense(fetchData(id));
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
```

```js
export function useSuspense(promise) {
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      result => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      reason => {
        promise.status = 'rejected';
        promise.reason = reason;
      },      
    );
    throw promise;
  }
}

let cache = new Map();

export function fetchData(albumId) {
  if (!cache.has(albumId)) {
    cache.set(albumId, getData(albumId));
  }
  return cache.get(albumId);
}

async function getData(albumId) {
  return new Promise((rs, rj) => {
    setTimeout(() => rs(albumId), 2000);
  });
}
```


### Showing stale content while fresh content is loading

A common UI pattern is to defer updating the list and to keep showing the previous results until the new results are ready. The `useDeferredValue` Hook lets you pass a deferred version of the query down:

```jsx
export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
          <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </>
  );
}
```

### Prevent the UI from being replaced by a fallback during an update

Replacing visible UI with a fallback creates a jarring user experience. This can happen when an update causes a component to suspend, and the nearest Suspense boundary is already showing content to the user.

To prevent this from happening, mark the update as non-urgent using `startTransition`. During a transition, React will wait until enough data has loaded to prevent an unwanted fallback from appearing:

```js
function handleNextPageClick() {
  // If this update suspends, don't hide the already displayed content
  startTransition(() => {
    setCurrentPage(currentPage + 1);
  });
}
```

However, any newly rendered `Suspense` boundaries will still immediately display fallbacks to avoid blocking the UI and let the user see the content as it becomes available.

If your router is integrated with `Suspense`, it should wrap its updates into `startTransition` automatically.


### Preventing already revealed content from hiding

```jsx
import { useTransition } from 'react';

function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState('/');
  const [isPending, startTransition] = useTransition();

  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }

  let content;
  if (page === '/') {
    content = (
      <IndexPage navigate={navigate} />
    );
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  }
  return (
    <Layout isPending={isPending}>
      {content}
    </Layout>
  );
}

function IndexPage({ navigate }) {
  return (
    <button onClick={() => navigate('/the-beatles')}>
      Open The Beatles artist page
    </button>
  );
}

function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Biography artistId={artist.id} />
      <Suspense fallback={<AlbumsGlimmer />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
```


### Resetting Suspense boundaries on navigation

Imagine you’re navigating within a user’s profile page, and something suspends. If that update is wrapped in a transition, it will not trigger the fallback for already visible content. That’s the expected behavior.

However, if you navigate to a route with different parameters, you might want to tell React it is different content. You can express this with a `key`:

```jsx
<ProfilePage key={queryParams.id} />
```