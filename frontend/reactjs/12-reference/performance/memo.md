# `memo`

`memo` lets you skip re-rendering a component when its props are unchanged.


## Parameters

```js
memo(Component, arePropsEqual?) 
```


## Parameters

- `Component`: The component that you want to memoize.
- (optional) `arePropsEqual`: A function that accepts two arguments: the component’s previous props, and its new props. It should return true if the old and new props are equal. Usually, you will not specify this function. By default, React will compare each prop with `Object.is`.


## Returns 

`memo` returns a new React component. It behaves the same as the component provided to `memo` except that React will not always re-render it when its parent is being re-rendered unless its props have changed.


## Caveats

You should only rely on `memo` as a performance optimization. If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add memo to improve performance.


## Usage

### Skipping re-rendering when props are unchanged

React normally re-renders a component whenever its parent re-renders. With `memo`, you can create a component that React will not re-render when its parent re-renders so long as its new props are the same as the old props.

```js
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
```

Even with `memo`, your component will re-render if its own state changes or if a context that it’s using changes. Memoization only has to do with props that are passed to the component from its parent.
