# `useCallback`

`useCallback` is a React Hook that lets you cache a function definition between re-renders.


## Parameters

```js
const cachedFn = useCallback(fn, dependencies)
```

- `fn`: : The function value that you want to cache. It can take any arguments and return any values.
- `dependencies`: The list of all reactive values referenced inside of the `fn` code.

## Returns

On the initial render, `useCallback` returns the `fn` function you have passed.

On next renders, React will either return an already stored `fn` function from the last render (if the `dependencies` haven't changed), or return the `fn` function you have passed during this render.


## Caveats

You should only rely on `useCallback` as a **performance optimization**. If your code doesn't work without it, find the underlying problem and fix it first. Then you may add useCallback back.

`useCallback` is only valuable in a few cases:
- You pass the `fn` function as a prop to a component wrapped in `memo`. You want to skip re-rendering if the value hasn't changed.
- The function you're passing is later used as a dependency of some Hook.


## Usage

### Skipping re-rendering of components

By default, when a component re-renders, React re-renders all of its children recursively.

In this example, when `ProductPage` re-renders with a different `theme`, the `ShippingForm` component also re-renders.

```js
function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

You can tell `ShippingForm` skip re-rendering when its props are the same as on last render by wrapping it in `memo`:

```js
import { memo } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});
```

Without `useCallback`, each time `ProductPage` is rendered, a new `handleSubmit` function will be created, `ShippingForm` props will never be the same, and your `memo` optimization won't work.


### Remove dependency when updating state from a memoized callback

Sometimes, you might need to update state based on previous state from a memoized callback.  When you read some state only to calculate the next state, you can remove that dependency by passing an updater function instead:

```js
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ No need for the todos dependency
  // ...
}
```


### Preventing an Effect from firing too often

```js
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ Only changes when roomId changes

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // ✅ Only changes when createOptions changes
  // ...
}
```


### Optimizing a custom Hook

If you’re writing a custom Hook, it’s recommended to wrap any functions that it returns into `useCallback`:

```js
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return {
    navigate,
    goBack,
  };
}
```


### `useCallback` for each list item in a loop

Extract a component for an individual item, and put `useCallback` there:

```js
function ReportList({ items }) {
  return (
    <article>
      {items.map(item =>
        <Report key={item.id} item={item} />
      )}
    </article>
  );
}

function Report({ item }) {
  // ✅ Call useCallback at the top level:
  const handleClick = useCallback(() => {
    sendReport(item)
  }, [item]);

  return (
    <figure>
      <Chart onClick={handleClick} />
    </figure>
  );
}
```
