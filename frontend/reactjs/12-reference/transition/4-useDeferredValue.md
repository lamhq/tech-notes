# useDeferredValue

`useDeferredValue` is a React Hook that lets you defer updating a part of the UI.

```js
const deferredValue = useDeferredValue(value)
```


## Parameters

- `value`: The value you want to defer. It can have any type.


## Returns

During the initial render, the returned deferred value will be the same as the value you provided.

During updates, React will first attempt a re-render with the old value (`useDeferredValue` will return the old value), and then try another re-render in background with the new value (so it will return the updated value).

In other words:
- During the initial render, the deferred value will be the same as the value you provided.
- During updates, React will first re-render without updating the deferred value.
- Then try to re-render with the newly received value in background.


## Caveats

The values you pass to `useDeferredValue` should either be primitive values (like strings and numbers) or objects created outside of rendering.

When `useDeferredValue` receives a different value, in addition to the current render, it schedules a re-render in the background with the new value. The background re-render is interruptible: if there's another update to the `value`, React will restart the background re-render from scratch.

`useDeferredValue` is integrated with `<Suspense>`. If the background update caused by a new value suspends the UI, the user will not see the fallback. They will see the old deferred value until the data loads.

The background re-render caused by `useDeferredValue` does not fire Effects until it's committed to the screen.

Compare to `useTransition`, `useDeferredValue` gives you more control on deferring parts of UI from rendering. It is mainly useful when the value comes "from above" and you don't actually have control over the corresponding `setState` call.


## Usage

### Showing stale content while fresh content is loading

In this example, each time you typing in the input, the loading fallback will be displayed.

Try typing `"a"`, waiting for the results, and then editing it to `"ab"`. The results for `"a"` get replaced by the loading fallback:

```jsx
import { Suspense, useState } from 'react';
import SearchResults from './SearchResults.js';

export default function App() {
  const [query, setQuery] = useState('');
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={query} />
      </Suspense>
    </>
  );
}
```

A common alternative UI pattern is to defer updating the list of results and to **keep showing the previous results until the new results are ready**. Call `useDeferredValue` to pass a deferred version of the query down:

```jsx
export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```

When typing in the input, the `query` value will update immediately, so the input will display the new value. However, the `deferredQuery` will keep its previous value until the data has loaded, so `SearchResults` will show the stale results for a bit.

Enter `"a"` in the input, wait for the results to load, and then edit the input to `"ab"`. Notice how instead of the Suspense fallback, you now see the stale result list until the new results have loaded.

To indicate that the content is stale and make it more obvious to the user that the result list does not match the latest query, you can add a visual indication when the stale result list is displayed:

```jsx
const isStale = query !== deferredQuery;

<Suspense fallback={<h2>Loading...</h2>}>
  <div style={{
    opacity: isStale ? 0.5 : 1,
    transition: isStale ? 'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear'
  }}>
    <SearchResults query={deferredQuery} />
  </div>
</Suspense>
```


## Deferring re-rendering for a part of the UI

You can also apply `useDeferredValue` as a performance optimization. It is useful when a part of your UI is slow to re-render, there's no easy way to optimize it, and you want to prevent it from blocking the rest of the UI.

Imagine you have a text field and a component (like a chart or a long list) that re-renders on every keystroke:

```jsx
function App() {
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={text} />
    </>
  );
}
```

Whenever you type into the input, the `SlowList` receives new props, and re-rendering its entire tree makes the typing feel janky. It blocks the user from typing.

In this case, `useDeferredValue` lets you prioritize updating the input (which must be fast) over updating the result list (which is allowed to be slower):

```jsx
function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
```

It tells React that re-rendering the list can be deprioritized so that it doesn't block the user from typing. See the example [here](https://codesandbox.io/s/uxhd8n?file=%2FApp.js&utm_medium=sandpack).

This optimization requires `SlowList` to be wrapped in memo. This is because whenever the text changes, React needs to be able to re-render the parent component quickly. During that re-render, deferredText still has its previous value, so `SlowList` is able to skip re-rendering (its props have not changed). Without `memo`, it would have to re-render anyway, defeating the point of the optimization:

```jsx
import { memo } from 'react';

export const SlowList = memo(function SlowList({ text }) {
  // Log once. The actual slowdown is inside SlowItem.
  console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />');

  let items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return (
    <ul className="items">
      {items}
    </ul>
  );
});

function SlowItem({ text }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Text: {text}
    </li>
  )
}
```


## How is deferring a value different from debouncing and throttling?

- **Debouncing** means you'd wait for the user to stop typing (e.g. for a second) before updating the list.
- **Throttling** means you'd update the list every once in a while (e.g. at most once a second).

While these techniques are helpful in some cases, `useDeferredValue` is better suited to optimizing rendering because it is deeply integrated with React itself and adapts to the user's device.

Unlike debouncing or throttling, it doesn't require choosing any fixed delay. If the user's device is fast (e.g. powerful laptop), the deferred re-render would happen almost immediately and wouldn't be noticeable. If the user's device is slow, the list would “lag behind” the input proportionally to how slow the device is.

Also, unlike with debouncing or throttling, deferred re-renders done by `useDeferredValue` are interruptible by default. This means that if React is in the middle of re-rendering a large list, but the user makes another keystroke, React will abandon that re-render, handle the keystroke, and then start rendering in background again.

By contrast, debouncing and throttling still produce a janky experience because **they're blocking**: they merely postpone the moment when rendering blocks the keystroke.

*If the work you're optimizing doesn't happen during rendering, debouncing and throttling are still useful. For example, they can let you fire fewer network requests. You can also use these techniques together.*