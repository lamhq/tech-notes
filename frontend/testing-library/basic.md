# Basic

## getBy

- `getBy*` return the first matching node for a query, and throw an error if no elements match or if more than one match is found (use `getAllBy` instead).
- `getAllBy*` return an array of all matching nodes for a query, and throw an error if no elements match.
- `queryBy*` return the first matching node for a query, and return `null` if no elements match. This throws if more than one match is found (use `queryAllBy` instead).
- `queryAllBy*` return an array of all matching nodes for a query, and return an empty array (`[]`) if no elements match.
- `findBy*` return a promise which resolves when an element is found which matches the given query. The promise is rejected if no element is found or if more than one element is found after a default timeout of `1000`ms.
- `findAllBy*` return a promise which resolves to an array of elements when any elements are found which match the given query. The promise is rejected if no elements are found after a default timeout of `1000`ms.

When you use any get calls in your test cases, the current state of the container (DOM) gets printed on the console.

```js
// <div>Hello world</div>
getByText(container, 'Goodbye world') // will fail by throwing error
```


## Queries

### ByLabelText

Search for the label that matches the given [`TextMatch`](#textmatch), then find the element associated with that label.

> getByLabelText, queryByLabelText, getAllByLabelText, queryAllByLabelText, findByLabelText, findAllByLabelText

```typescript
getByLabelText(
  container: HTMLElement, // if you're using `screen`, then skip this argument
  text: TextMatch,
  options?: {
    selector?: string = '*',
    exact?: boolean = true,
    normalizer?: NormalizerFn,
  }): HTMLElement
```

```html
<label for="username-input">Username</label>
<input id="username-input" />
```

```js
import { render, screen } from '@testing-library/react'

render(<Login />)

const inputNode = screen.getByLabelText('username')
```

### `ByPlaceholderText`

This will search for all elements with a placeholder attribute and find one that matches the given [`TextMatch`](#textmatch).

> getByPlaceholderText, queryByPlaceholderText, getAllByPlaceholderText, queryAllByPlaceholderText, findByPlaceholderText, findAllByPlaceholderText

```typescript
getByPlaceholderText(
  container: HTMLElement, // if you're using `screen`, then skip this argument
  text: TextMatch,
  options?: {
    exact?: boolean = true,
    normalizer?: NormalizerFn,
  }): HTMLElement
```

```html
<input placeholder="Username" />
```

```js
import { render, screen } from '@testing-library/react'

render(<MyComponent />)
const inputNode = screen.getByPlaceholderText('Username')
```


- ByText
- ByAltText
- ByTitle
- ByDisplayValue
- ByRole
- ByTestId


## Debug

```js
import { screen } from '@testing-library/dom'

document.body.innerHTML = `
  <button>test</button>
  <span>multi-test</span>
  <div>multi-test</div>
`

// debug document
screen.debug()
// debug single element
screen.debug(screen.getByText('test'))
// debug multiple elements
screen.debug(screen.getAllByText('multi-test'))
```


## TextMatch

Several APIs accept a `TextMatch` which can be a `string`, `regex` or a `function` which returns `true` for a match and `false` for a mismatch.

```html
<div>Hello World</div>
```

```js
// Matching a string:
screen.getByText('Hello World') // full string match
screen.getByText('llo Worl', { exact: false }) // substring match
screen.getByText('hello world', { exact: false }) // ignore case

// Matching a regex:
screen.getByText(/World/) // substring match
screen.getByText(/world/i) // substring match, ignore case
screen.getByText(/^hello world$/i) // full string match, ignore case
screen.getByText(/Hello W?oRlD/i) // advanced regex

// Matching with a custom function:
screen.getByText((content, element) => content.startsWith('Hello'))
```