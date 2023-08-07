# User Actions

## Firing Events

```js
import {render, screen, fireEvent} from '@testing-library/react'

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
