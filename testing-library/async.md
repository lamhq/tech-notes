# Async Utilities

wait for an element to appear or disappear in response to an action

## waitFor

```js
function waitFor<T>(
  callback: () => void,
  options?: {
    container?: HTMLElement
    timeout?: number
    interval?: number
    mutationObserverOptions?: MutationObserverInit
  }
): Promise<T>
```

```js
// ...
// Wait until the callback does not throw an error. In this case, that means
// it'll wait until the mock function has been called once.
await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))
// ...
```


## waitForElementToBeRemoved

The first argument must be an element, array of elements, or a callback which returns an element or array of elements.

```js
function waitForElementToBeRemoved<T>(
  callback: (() => T) | T,
  options?: {
    container?: HTMLElement
    timeout?: number
    interval?: number
    mutationObserverOptions?: MutationObserverInit
  }
): Promise<T>
```

```js
const el = document.querySelector('div.getOuttaHere')

waitForElementToBeRemoved(document.querySelector('div.getOuttaHere')).then(() =>
  console.log('Element no longer in DOM')
)

el.setAttribute('data-neat', true)
// other mutations are ignored...

el.parentElement.removeChild(el)
```