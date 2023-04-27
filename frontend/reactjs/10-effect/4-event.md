# Separating Events from Effects

## Logic inside event handlers is not reactive

```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  // ...
  function handleSendClick() {
    sendMessage(message);
  }
  // ...
  return (
    <>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>;
    </>
  );
}
```

Code inside event handlers **should not run again only because the reactive value has changed**.

Event handlers aren’t reactive, so `sendMessage(message)` will only run when the user clicks the **Send** button.


## Logic inside Effects is reactive

From the user’s perspective, a change to the `roomId` does mean that they want to connect to a different room. 

In other words, the logic for connecting to the room should be reactive. You want these lines of code to “keep up” with the reactive value, and to run again if that value is different. That’s why it belongs in an Effect:

```jsx
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId]);
```


## Extracting non-reactive logic out of Effects

Imagine that you want to show a notification when the user connects to the chat. You read the current theme (dark or light) from the props so that you can show the notification in the correct color:

```js
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId, theme]); // ✅ All dependencies declared
  // ...
```

The chat re-connects every time you switch between the dark and the light theme. That’s not great!

In other words, you don’t want this line to be reactive, even though it is inside an Effect (which is reactive):

```js
// ...
showNotification('Connected!', theme);
// ...
```

Use a special Hook called `useEffectEvent` to extract this non-reactive logic out of your Effect:

```jsx
import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });
  // ...
```

`onConnected` is called an Effect Event. The logic inside it is not reactive, and it always “sees” the latest values of your props and state.

Now you can call the `onConnected` Effect Event from inside your Effect:

```js
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

Note that you had to remove `onConnected` from the list of your Effect’s dependencies. **Effect Events are not reactive and must be omitted from dependencies**.

Effect Events is similar to event handlers. The main difference is that event handlers run in response to a user interactions, whereas Effect Events are triggered by you from Effects. 

Effect Events let you “break the chain” between the reactivity of Effects and code that should not be reactive.


## Example: log visiting

Say you have an Effect to log the page visits. You want to include the number of items in the shopping cart together with url every page visit.

```js
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  useEffect(() => {
    logVisit(url, numberOfItems);
  }, [url]); // 🔴 React Hook useEffect has a missing dependency: 'numberOfItems'
  // ...
}
```

You used `numberOfItems` inside the Effect, so the linter asks you to add it as a dependency. However, you don’t want the `logVisit` call to be reactive with respect to `numberOfItems`. If the user puts something into the shopping cart, and the `numberOfItems` changes, this does not mean that the user visited the page again. 

Split the code in two parts:

```js
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // ✅ All dependencies declared
  // ...
}
```

Here, `onVisit` is an Effect Event. The code inside it isn’t reactive. This is why you can use `numberOfItems` (or any other reactive value!) without worrying that it will cause the surrounding code to re-execute on changes.

As a result, you will call `logVisit` for every change to the url, and always read the latest `numberOfItems`. However, if `numberOfItems` changes on its own, this will not cause any of the code to re-run.


## Limitations of Effect Events

- Only call them from inside Effects.
- Never pass them to other components or Hooks.

For example, don’t declare and pass an Effect Event like this:

```jsx
function Timer() {
  const [count, setCount] = useState(0);

  const onTick = useEffectEvent(() => {
    setCount(count + 1);
  });

  useTimer(onTick, 1000); // 🔴 Avoid: Passing Effect Events

  return <h1>{count}</h1>
}

function useTimer(callback, delay) {
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay, callback]); // Need to specify "callback" in dependencies
}
```

Instead, always declare Effect Events directly next to the Effects that use them:

```jsx
function Timer() {
  const [count, setCount] = useState(0);
  useTimer(() => {
    setCount(count + 1);
  }, 1000);
  return <h1>{count}</h1>
}

function useTimer(callback, delay) {
  const onTick = useEffectEvent(() => {
    callback();
  });

  useEffect(() => {
    const id = setInterval(() => {
      onTick(); // ✅ Good: Only called locally inside an Effect
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]); // No need to specify "onTick" (an Effect Event) as a dependency
}
```
