# lazy

`lazy` lets you defer loading component’s code until it is rendered for the first time.


## Parameters

```
lazy(load)
```

`load`: A function that returns a Promise or another *thenable* (a Promise-like object with a `then` method).

After React first calls `load`, it will wait for it to resolve, and then render the resolved value as a React component. React will not call `load` more than once.

If the Promise rejects, React will `throw` the rejection reason for the nearest Error Boundary to handle.


## Returns

`lazy` returns a React component you can render in your tree.

While the code for the lazy component is still loading, attempting to render it will *suspend*. Use `<Suspense>` to display a loading indicator while it’s loading.


## Usage

```jsx
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

<Suspense fallback={<Loading />}>
  <h2>Preview</h2>
  <MarkdownPreview />
</Suspense>
```
