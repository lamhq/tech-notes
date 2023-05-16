# `useMemo`

`useMemo` is a React Hook that lets you cache the result of a calculation between re-renders.

## Parameters

```js
useMemo(calculateValue, dependencies)
```

- `calculateValue`: The function calculating the value that you want to cache.
- `dependencies`: The list of all reactive values referenced inside of the calculateValue code


## Returns

On the initial render, `useMemo` returns the result of calling `calculateValue` with no arguments.

During next renders, it will either return an already stored value from the last render (if the dependencies haven’t changed), or call `calculateValue` again, and return the result that `calculateValue` has returned.


## Caveats

You should only rely on `useMemo` as a performance optimization. If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add `useMemo` to improve performance.

Optimizing with `useMemo` is only valuable in a few cases:

- The calculation you’re putting in `useMemo` is noticeably slow, and its dependencies rarely change.
- You pass it as a prop to a component wrapped in `memo`. You want to skip re-rendering if the value hasn’t changed. Memoization lets your component re-render only when dependencies aren’t the same.
- The value you’re passing is later used as a dependency of some Hook. For example, maybe another `useMemo` calculation value depends on it. Or maybe you are depending on this value from `useEffect`.


## How to tell if a calculation is expensive?

You can add a console log to measure the time spent in a piece of code:

```js
console.time('filter array');
const visibleTodos = filterTodos(todos, tab);
console.timeEnd('filter array');
```

If the overall logged time adds up to a significant amount (say, `1ms` or more), it might make sense to memoize that calculation.


## Usage

### Skipping expensive recalculations

```js
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```


### Skipping re-rendering of components

```js
// TodoList.js
export default function TodoList({ todos, tab, theme }) {
  // Tell React to cache your calculation between re-renders...
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab] // ...so as long as these dependencies don't change...
  );

  return (
    <div className={theme}>
      {/* ...List will receive the same props and can skip re-rendering */}
      <List items={visibleTodos} />
    </div>
  );
}
```

```js
// List.js
import { memo } from 'react';

const List = memo(function List({ items }) {
  // ...
});
```

Instead of wrapping `List` in memo, you could wrap the `<List />` JSX node itself in `useMemo`:

```js
export default function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  const children = useMemo(() => <List items={visibleTodos} />, [visibleTodos]);
  return (
    <div className={theme}>
      {children}
    </div>
  );
}
```


### Memoizing a dependency of another Hook

```js
function Dropdown({ allItems, text }) {
  const visibleItems = useMemo(() => {
    const searchOptions = { matchMode: 'whole-word', text };
    return searchItems(allItems, searchOptions);
  }, [allItems, text]); // ✅ Only changes when allItems or text changes
  // ...
}
```