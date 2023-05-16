# useSyncExternalStore

`useSyncExternalStore` is a React Hook that lets you subscribe to an external store. The `useSyncExternalStore` API is mostly useful if you need to integrate with existing non-React code.

```js
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```


## Parameters

- `subscribe`: a function that subscribe to the store and return a function that unsubscribes.
- `getSnapshot`: a function that read a snapshot of the data from the store.
- `getServerSnapshot` (optional): A function that returns the initial snapshot of the data in the store. It will be used only during server rendering and during hydration of server-rendered content on the client.

`subscribe` function takes a single `callback` argument and subscribes it to the store. When the store changes, it invoke the provided `callback`. This will cause the component to re-render. `getSnapshot` will be get called to return a snapshot of the data from the store and return that data to component that called `useSyncExternalStore`.


## Returns 

Return the current snapshot of the store which you can use in your rendering logic.


## Caveats 

The store snapshot returned by `getSnapshot` must be immutable. If the underlying store has mutable data, return a new immutable snapshot if the data has changed. Otherwise, return a cached last snapshot.

React will resubscribe to your store if you pass a different `subscribe` function between re-renders. To avoid resubscribing, move the `subscribe` function outside the component.

Make sure that `getServerSnapshot` returns the same exact data on the initial client render as it returned on the server. One way to do this is to emit a `<script>` tag during server rendering that sets a global like `window.MY_STORE_DATA`, and read from that global.


## Usage

### Subscribing to an external store 

Sometimes a component needs to read some data from some store outside of React that changes over time. This includes:

- Third-party state management libraries that hold state outside of React.
- Browser APIs that expose a mutable value and events to subscribe to its changes.

```js
// This is an example of a third-party store
// that you might need to integrate with React.

// If your app is fully built with React,
// we recommend using React state instead.

let nextId = 0;
let todos = [{ id: nextId++, text: 'Todo #1' }];
let listeners = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: 'Todo #' + nextId }]
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  }
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}
```

```jsx
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

export default function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
```


### Subscribing to a browser API

Suppose that you want your component to display whether the network connection is active. The browser exposes this information via a property called `navigator.onLine`. You should read it in `getSnapshot` function.

When `navigator.onLine` changes, the browser fires the `online` and `offline` events on the `window` object. You need to subscribe the `callback` argument to the corresponding events, and then return a function that cleans up the subscriptions.

To provide the initial value (during server-rendering), pass a `getServerSnapshot` function as the third argument to `useSyncExternalStore`.

```js
// useOnlineStatus.js
import { useSyncExternalStore } from 'react';

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return isOnline;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getServerSnapshot() {
  return true; // Always show "Online" for server-generated HTML
}
```

```js
// App.js
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
```