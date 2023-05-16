# `<Profiler>`

`<Profiler>` lets you measure rendering performance of a React tree programmatically.

## Props

```js
<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>
```

- `id`: A string identifying the part of the UI you are measuring.
- `onRender`: An `onRender` callback that React calls every time components within the profiled tree update. It receives information about what was rendered and how much time it took.


### `onRender` callback 

React will call your onRender callback with information about what was rendered.

```js
function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Aggregate or log render timings...
}
```