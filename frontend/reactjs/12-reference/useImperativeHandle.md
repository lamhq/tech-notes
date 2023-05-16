# useImperativeHandle

`useImperativeHandle` is a React Hook that lets you customize the handle exposed as a `ref`.

```js
useImperativeHandle(ref, createHandle, dependencies?)
```

## Parameters

- `ref`: The `ref` you received as the second argument from the forwardRef render function.
- `createHandle`: A function that takes no arguments and returns the ref handle you want to expose.
- `dependencies` (optional): The list of all reactive values referenced inside of the `createHandle` code.


## Returns

`useImperativeHandle` returns `undefined`


## Usage

### Exposing a custom ref handle to the parent component

In this example, a ref to `MyInput` will receive the `<input>` DOM node. 

```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    // ref.current is the DOM node <input>
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

However, you can expose a custom value instead. For example, you want to expose two methods: `focus` and `scrollIntoView`. To do this, keep the real browser DOM in a separate ref. Then use `useImperativeHandle` to expose a handle with only the methods that you want the parent component to call:

```jsx
const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});
```
