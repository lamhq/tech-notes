# Synchronizing with Effects

## Two types of logic inside React components

### Rendering code

This is where you take the props and state, transform them, and return the JSX you want to see on the screen. Rendering code must be pure.

### Event handlers

They are nested functions inside your components that do things rather than just calculate them:

- update an input field
- submit an HTTP POST request to buy a product
- navigate the user to another screen

Event handlers contain **"side effects"** (they change the program’s state) caused by a specific user action (for example, a button click or typing).


## What is a "side-effect"?

In React.js, a side-effect is any operation that modifies something outside of the component itself such as updating the DOM or fetching data.


## How are Effects different from events?

Consider a `ChatRoom` component that must connect to the chat server whenever it’s visible on the screen.

Connecting to a server is not a pure calculation (it’s a side effect). However, there is no single particular event like a click that causes `ChatRoom` to be displayed. So it can't be in **Event handlers** code.

Setting up a server connection is an Effect because it should happen no matter which interaction caused the component to appear.

**Effects let you specify side effects that are caused by rendering itself, rather than by a particular event**. 

Effects run at the end of a commit after the screen updates.


## Effect dependencies

By default, Effects run after every render. You can tell React to **skip unnecessarily re-running the Effect** by specifying an array of dependencies as the second argument to the `useEffect` call.

```js
useEffect(() => {
  // This runs after every render
});

useEffect(() => {
  // This runs only on mount (when the component appears)
}, []);

useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);
```

**Notice that you can’t “choose” your dependencies**. You will get a lint error if the dependencies you specified don’t match what React expects based on the code inside your Effect.

**If you don’t want some code to re-run, edit the Effect code itself to not “need” that dependency.**


## Example: Video player

```jsx
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}
```

When your `VideoPlayer` component renders (either the first time or if it re-renders), a few things will happen:
1. React update the screen, ensuring the `<video>` tag is in the DOM with the right props.
1. React run your Effect.
1. your Effect will call `play()` or `pause()` depending on the value of `isPlaying`

### Why was the ref omitted from the dependency array?

This Effect uses both `ref` and `isPlaying`, but only isPlaying is declared as a dependency:

```js
function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);
```

This is because the `ref` object has a stable identity: React guarantees you’ll always get the same object from the same `useRef` call on every render. It never changes, so it will never by itself cause the Effect to re-run.

Note: The `set` functions returned by `useState` also have stable identity.


## Effect runs twice

In development (with Strict Mode enabled), React remounts every component once immediately after its initial mount to help you spot problems like not cleaning up resources.

In this example, `"✅ Connecting..."` gets printed twice:

```jsx
import { useEffect } from 'react';

function createConnection() {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting...');
    },
    disconnect() {
      console.log('❌ Disconnected.');
    }
  };
}

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
  }, []);
  return <h1>Welcome to the chat!</h1>;
}
```

Seeing the `"✅ Connecting..."` log twice helps you notice the real issue: your code doesn’t close the connection when the component unmounts.

The right question isn’t **“how to run an Effect once”**, but **“how to fix my Effect so that it works after remounting”**.

Usually, the answer is to implement the cleanup function.  The cleanup function should stop or undo whatever the Effect was doing.


## Add cleanup (optional)

```js
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  return () => {
    connection.disconnect();
  };
}, []);
```
