# Basic

## Installation

```sh
yarn add -D @testing-library/react-hooks
```

## Rendering

```js
// useCounter.js
import { useState, useCallback } from 'react'
export default function useCounter() {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => setCount((x) => x + 1), [])
  return { count, increment }
}
```

```js
// useCounter.test.js
import { renderHook } from '@testing-library/react-hooks'
import useCounter from './useCounter'

test('should use counter', () => {
  const { result } = renderHook(() => useCounter())
  expect(result.current.count).toBe(0)
  expect(typeof result.current.increment).toBe('function')
})

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter())
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(1)
})
```

## Providing Props

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

```js
// useCounter.test.js
import { useEffect } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import sideEffect from './sideEffect'
test('should clean up side effect', () => {
  const { rerender } = renderHook(
    ({ id }) => {
      useEffect(() => {
        sideEffect.start(id)
        return () => {
          sideEffect.stop(id) // this id will get the old value when the effect is cleaned up
        }
      }, [id])
    },
    {
      initialProps: { id: 'first' }
    }
  )
  rerender({ id: 'second' })
  expect(sideEffect.get('first')).toBe(false)
  expect(sideEffect.get('second')).toBe(true)
})
```