# Basic Usage

Here's a hook that return a counter and a function to increase that counter:

```js
// useCounter.js
import { useState, useCallback } from 'react'

export default function useCounter() {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => setCount((x) => x + 1), [])
  return { count, increment }
}
```


## Render hook

To test `useCounter` we need to render it using the `renderHook` function:

```js
// useCounter.test.js
import { renderHook } from '@testing-library/react-hooks'
import useCounter from './useCounter'

test('should use counter', () => {
  const { result } = renderHook(() => useCounter())
  expect(result.current.count).toBe(0)
  expect(typeof result.current.increment).toBe('function')
})
```


## Update hook's value

We call the `increment` function and check that the `count` value increases:

```js
import { renderHook, act } from '@testing-library/react-hooks'

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter())

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})
```

After `increment` is called, the current `count` value now reflects the new value returned by our hook.


## Re-render hook

Sometimes a hook relies on the props passed to it in order to do its thing. When those values change, we need to re-render the hook.

In this example, `useCounter` hook to have a reset function that resets the value to the `initialValue`:

```js
// useCounter.js
import { useState, useCallback } from 'react'

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const increment = useCallback(() => setCount((x) => x + 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  return { count, increment, reset }
}
```

To change the input props of our hook in a test, we simply update the value in a variable and rerender the hook:

```js
// useCounter.test.js
import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from './useCounter'

test('should reset counter to updated initial value', () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useCounter(initialValue), 
    { initialProps: { initialValue: 0 } }
  );

  rerender({ initialValue: 10 })

  act(() => {
    result.current.reset()
  })

  expect(result.current.count).toBe(10)
})
```
