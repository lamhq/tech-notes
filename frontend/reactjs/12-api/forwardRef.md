# forwardRef

`forwardRef` lets your component expose a DOM node to parent component with a ref.


## Parameters

```
forwardRef(render)
```

`render`: The render function for your component. React calls this function with the props and `ref` that your component received from its parent.


## Returns

`forwardRef` returns a React component that you can render in JSX. The component returned by `forwardRef` is also able to receive a `ref` prop.


## Caveats

In Strict Mode, React will call your render function twice in order to help you find accidental impurities.


## `render` function

```jsx
function MyInputFn(props, ref) {
  return (
    <label>
      {props.label}
      <input ref={ref} />
    </label>
  );
}
```

```jsx
const MyInput = forwardRef(MyInputFn);
```

### Parameters 

- `props`: The props passed by the parent component.
- `ref`:  The ref attribute passed by the parent component. If the parent component has not passed a ref, it will be `null`. You should either pass the ref you receive to another component, or pass it to `useImperativeHandle`.


## Usage

### Exposing a DOM node to the parent component

```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});

function Form() {
  const ref = useRef(null);

  function handleClick() {
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