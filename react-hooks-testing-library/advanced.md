# Advanced

## Context

```js
// useCounter.js
import React, { useState, useContext, useCallback } from 'react'

const CounterStepContext = React.createContext(1)

export const CounterStepProvider = ({ step, children }) => (
  <CounterStepContext.Provider value={step}>{children}</CounterStepContext.Provider>
)

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const step = useContext(CounterStepContext)
  const increment = useCallback(() => setCount((x) => x + step), [step])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  return { count, increment, reset }
}
```

```js
// useCounter.test.js
import { renderHook, act } from '@testing-library/react-hooks'
import { CounterStepProvider, useCounter } from './counter'

test('should use custom step when incrementing', () => {
  const wrapper = ({ children, step }) => (
    <CounterStepProvider step={step}>{children}</CounterStepProvider>
  )
  const { result, rerender } = renderHook(() => useCounter(), {
    wrapper,
    initialProps: {
      step: 2
    }
  })
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(2)
  /**
   * Change the step value
   */
  rerender({ step: 8 })
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(10)
})
```


## Async

```js
// useCounter.js
import React, { useState, useContext, useCallback } from 'react'
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const step = useContext(CounterStepContext)
  const increment = useCallback(() => setCount((x) => x + step), [step])
  const incrementAsync = useCallback(() => setTimeout(increment, 100), [increment])
  return { count, increment, incrementAsync }
}
```

```js
// useCounter.test.js
import { renderHook } from '@testing-library/react-hooks'
import { useCounter } from './counter'
test('should increment counter after delay', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCounter())
  result.current.incrementAsync()
  await waitForNextUpdate()
  expect(result.current.count).toBe(1)
})
```


## Catching Erors

```js
// useCounter.js
import React, { useState, useContext, useCallback } from 'react'
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const step = useContext(CounterStepContext)
  const increment = useCallback(() => setCount((x) => x + step), [step])
  if (count > 9000) {
    throw Error("It's over 9000!")
  }
  return { count, increment }
}
```

```js
// useCounter.test.js
import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter } from './counter'
it('should throw when over 9000', () => {
  const { result } = renderHook(() => useCounter(9000))
  act(() => {
    result.current.increment()
  })
  expect(result.error).toEqual(Error("It's over 9000!"))
})
```
