# Refs

## Referencing values with refs

When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a *ref*.

```js
import { useRef } from 'react';

const ref = useRef(0);
```

`useRef` returns an object like this:

```js
{ 
  current: 0 // The value you passed to useRef
}
```

`ref.current` property is mutable. You could point to anything: a string, an object, or even a function.

Like state, refs are retained by React between re-renders. Changing a ref does not re-renders a component.

Refs are an “escape hatch” you won’t need often.


### Example: building a stopwatch

```jsx
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}
```


## When to use refs

Typically, you will use a ref when your component needs to “step outside” React and communicate with external APIs — often a browser API that won’t impact the appearance of the component.

Here are a few of these rare situations:

- Storing timeout IDs
- Storing and manipulating DOM elements
- Storing other objects that aren’t necessary to calculate the JSX.


## Manipulating the DOM with Refs

Sometimes you might need access to the DOM elements managed by React—for example, to focus a node, scroll to it, or measure its size and position. There is no built-in way to do those things in React, so you will need a ref to the DOM node.

```jsx
import { useRef } from 'react';

const myRef = useRef(null);

<div ref={myRef}>
```

```js
// You can use any browser APIs, for example:
myRef.current.scrollIntoView();
```

### Getting ref from an array of elements

```tsx
// the ref that hold a list of img elements
const refs = useRef<HTMLImageElement[]>([]);

function setRef(ref: HTMLImageElement | null, index: number) {
  if (ref) {
    refs.current[index] = ref;
  }
}

images.map((image, index) => (
  <img
    src={image}
    ref={(ref) => setRef(ref, index)}
    key={image}
    alt=""
  />
))
```

## forward ref

Components that want to expose their DOM nodes have to specify that it “forwards” its ref to one of its children:

```jsx
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```


## When React attaches the refs 

- During the first render, the DOM nodes have not yet been created, so `ref.current` will be `null`.
- During the rendering of updates, the DOM nodes haven’t been updated yet.
- During the commit. Before updating the DOM, React sets the affected `ref.current` values to `null`. After updating the DOM, React immediately sets them to the corresponding DOM nodes.


## Best practices for refs

- Treat refs as an escape hatch. Refs are useful when you work with external systems or browser APIs. If much of your application logic and data flow relies on refs, you might want to rethink your approach.
- Don’t read or write `ref.current` during rendering (use state instead). Usually, you will access refs from event handlers. If you want to do something with a ref, but there is no particular event to do it in, you might need an Effect. 
