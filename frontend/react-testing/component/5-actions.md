# User Actions

## Firing Events

```js
fireEvent.change(getByLabelText(/username/i), {target: {value: 'a'}})

// note: attempting to manually set the files property of an HTMLInputElement
// results in an error as the files property is read-only.
// this feature works around that by using Object.defineProperty.
fireEvent.change(getByLabelText(/picture/i), {
  target: {
    files: [new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'})],
  },
})

// Note: The 'value' attribute must use ISO 8601 format when firing a
// change event on an input of type "date". Otherwise the element will not
// reflect the changed value.
fireEvent.change(input, {target: {value: '2020-05-24'}})

// Keyboard events
fireEvent.keyDown(domNode, {key: 'Enter', code: 'Enter', charCode: 13})

fireEvent.keyDown(domNode, {key: 'A', code: 'KeyA'})
```


### Using Jest Function Mocks

```jsx
import {render, screen, fireEvent} from '@testing-library/react'

const Button = ({onClick, children}) => (
  <button onClick={onClick}>{children}</button>
)

test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click Me</Button>)
  fireEvent.click(screen.getByText(/click me/i))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```


## Async Methods

These can be useful to wait for an element to appear or disappear in response to an event, user action, timeout, or Promise. 

The async methods return Promises.

### `findBy` Queries

`findBy` methods are a combination of `getBy` queries and `waitFor`. They accept the `waitFor` options as the last argument:

```js
await screen.findByText('text', queryOptions, waitForOptions))
```

`findBy` queries work when you expect an element to appear but the change to the DOM might not happen immediately.

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

`waitFor` will call the callback until the callback does not throw an error.

```js
// ...
// Wait until the callback does not throw an error. In this case, that means
// it'll wait until the mock function has been called once.
await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))
```

``waitFor`` may run the callback a number of times until the timeout is reached.

If you return a promise in the callback, then the waitFor utility does not call your callback again until that promise rejects.

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


### `waitForElementToBeRemoved`

To wait for the removal of element(s) from the DOM.

The first argument must be an element, array of elements, or a callback which returns an element or array of elements.

```js
const el = document.querySelector('div.getOuttaHere')

waitForElementToBeRemoved(document.querySelector('div.getOuttaHere')).then(() =>
  console.log('Element no longer in DOM'),
)

el.setAttribute('data-neat', true)
// other mutations are ignored...

el.parentElement.removeChild(el)
// logs 'Element no longer in DOM'
```