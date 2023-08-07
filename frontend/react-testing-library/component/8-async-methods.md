# Async Methods

**Some async methods that wait for an element** to appear or disappear in response to an event, user action, timeout, or Promise. 

The async methods return Promises, be sure to use `await` or `.then` when calling them.

### `findBy` Queries

`findBy` methods are used  when you expect an element to appear but the change to the DOM might not happen immediately.

They accept the `waitFor` options as the last argument:

```js
await screen.findByText('text', queryOptions, waitForOptions))
```

Example:

```js
const button = screen.getByRole('button', {name: 'Click Me'})
fireEvent.click(button)

// element is initially not present...
// wait for appearance and return the element
await screen.findByText('Clicked once')

fireEvent.click(button)
await screen.findByText('Clicked twice')
```


### `waitFor`

- `waitFor` will call the callback until the callback does not throw an error.
- ``waitFor`` may run the callback a number of times until the timeout is reached.
- The default interval is 50ms
- The default timeout is 1000ms.
- If you return a promise in the callback, then `waitFor` does not call your callback again until that promise rejects.

Wait until the callback does not throw an error:

```js
// it'll wait until the mock function has been called once.
await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))
```


Wait for an element appears:

```js
test('movie title appears', async () => {
  // element is initially not present...

  // wait for appearance inside an assertion
  await waitFor(() => {
    expect(getByText('the lion king')).toBeInTheDocument()
  })
})
```

Wait for an element disappears:

```js
test('movie title goes away', async () => {
  // element is initially present...
  // note use of queryBy instead of getBy to return null
  // instead of throwing in the query itself
  await waitFor(() => {
    expect(queryByText('i, robot')).not.toBeInTheDocument()
  })
})
```

### `waitForElementToBeRemoved`

- Wait for the removal of element(s) from the DOM.
- The first argument must be an element, array of elements, or a callback which returns an element or array of elements.
- `waitForElementToBeRemoved` return a promise that resolve to `true` when element is removed.


```js
test('movie title no longer present in DOM', async () => {
  // element is removed
  await waitForElementToBeRemoved(() => queryByText('the mummy'))
})
```
