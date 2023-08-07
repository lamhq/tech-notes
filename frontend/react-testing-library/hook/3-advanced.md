# Advanced

## Provide Context to hook using Wrapper

Often, a hook is going to need a value out of context.

The `useContext` hook will often require a Provider to be wrapped around the component using the hook.

We can use the `wrapper` option for `renderHook` to do just that.

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

In our test, we simply use `CounterStepProvider` as the wrapper when rendering the hook:

```js
// useCounter.test.js
import { renderHook, act } from '@testing-library/react-hooks'
import { CounterStepProvider, useCounter } from './counter'

test('should use custom step when incrementing', () => {
  const wrapper = ({ children }) => <CounterStepProvider step={2}>{children}</CounterStepProvider>
  const { result } = renderHook(() => useCounter(), { wrapper })

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(2)
})
```


## Passing props to Wrapper component

The `initialProps` and the new props of rerender are accessible by the callback function of the wrapper.

```js
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


## Async Update

In this example, `useCounter` hook have an `incrementAsync` callback that will update the count after 100ms:

```js
// useCounter.js
import React, { useState, useContext, useCallback } from 'react'

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const incrementAsync = useCallback(
    () =>
      setTimeout(() => {
        setCount((cnt) => cnt + 1);
      }, 100),
    [setCount]
  );
  return { count, incrementAsync };
}
```

To test `incrementAsync` we need to use `waitFor` to wrap our assertions:

```js
// useCounter.test.js
import { useCallback, useState } from 'react';
import { act, renderHook } from '@testing-library/react';
import { useCounter } from './counter'

describe('useCounter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should increment counter after delay', async () => {
    const { result } = renderHook(() => useCounter());

    // increase the counter after a delay
    result.current.incrementAsync();
    // expect the counter has not been increased yet
    expect(result.current.count).toBe(0);

    act(() => {
      // Fast-forward until all timers have been executed
      // it need to be wrapped in `act`, since the state is updated after timeout
      jest.runAllTimers();
    });

    // expect the counter is increased after delay
    expect(result.current.count).toBe(1);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
```


## Catching Errors

In this example, `useCounter` hook threw an error if the count reached a specific value:

```js
// useCounter.js
import React, { useState, useContext, useCallback } from 'react'

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const step = useContext(CounterStepContext)
  const increment = useCallback(() => setCount((x) => x + step), [step])
  const incrementAsync = useCallback(() => setTimeout(increment, 100), [increment])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  if (count > 9000) {
    throw Error("It's over 9000!")
  }

  return { count, increment, incrementAsync, reset }
}
```

You can use `result.error` to access an error that may have been thrown in the previous render.

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
