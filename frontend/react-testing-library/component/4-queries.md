# Queries

## Overview

Queries are the methods to find elements on the page.

There are several types of queries (`get`, `find`, `query`). The difference between them is whether the query will throw an error if no element is found or if it will return a Promise and retry. 

After selecting an element, you can:
- use the Events API or user-event to fire events and simulate user interactions with the page.
- use Jest and jest-dom to make assertions about the element.

As elements appear and disappear in response to actions, **Async APIs** like `waitFor` or `findBy` queries can be used to await the changes in the DOM.

To find only elements that are children of a specific element, you can use `within`.


## Example

```tsx
import {render, screen} from '@testing-library/react'

test('should show login form', () => {
  render(<Login />)
  const input = screen.getByLabelText('Username')
  // Events and assertions...
})
```


## Types of Queries

- Single Elements:
  - `getBy`: throw an error if no elements match
  - `queryBy`: return `null`
  - `findBy`: return a Promise
- Multiple Elements: `getAllBy`, `queryAllBy`, `findAllBy`


## Priority

Your test should resemble how users interact with your code (component, page, etc.) as much as possible. With this in mind, we recommend this order of priority:

1. Queries Accessible to Everyone:
    1. `getByRole`: query every element that is exposed in the accessibility tree. Check the [list of roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles).
    1. `getByLabelText`: good for form fields
    1. `getByPlaceholderText`
    1. `getByText`
    1. `getByDisplayValue`: The current value of a form element 
1. Semantic Queries HTML5 and ARIA compliant selectors:
    1. `getByAltText`
    1. `getByTitle`
1. Test IDs
    1. `getByTestId`


## Using Queries

The base queries from DOM Testing Library require you to pass a container as the first argument. Most framework-implementations of Testing Library provide a pre-bound version of these queries, you do not have to provide a container.

Given the following DOM elements:

```html
<body>
  <div id="app">
    <label for="username-input">Username</label>
    <input id="username-input" />
  </div>
</body>
```

You can use a query to find an element:

```tsx
import {screen, getByLabelText} from '@testing-library/dom'

// With screen:
const inputNode1 = screen.getByLabelText('Username')
```


## `screen` object

DOM Testing Library exports a screen object which has every query that is pre-bound to `document.body` (using the `within` functionality). Wrappers such as React Testing Library re-export screen so you can use it the same way.

```tsx
import {render, screen} from '@testing-library/react'

render(
  <div>
    <label htmlFor="example">Example</label>
    <input id="example" />
  </div>,
)

const exampleInput = screen.getByLabelText('Example')
```

## Text matching

Most of the query APIs take a `TextMatch` as an argument. The argument can be either a string, regex, or a function of signature:

```ts
(content?: string, element?: Element | null) => boolean
```

which returns `true` for a match and `false` for a mismatch.

Given the following HTML:

```html
<div>Hello World</div>
```

Will find the `div`:

```ts
// Matching a string:
screen.getByText('Hello World') // full string match
screen.getByText('llo Worl', {exact: false}) // substring match
screen.getByText('hello world', {exact: false}) // ignore case

// Matching a regex:
screen.getByText(/World/) // substring match
screen.getByText(/world/i) // substring match, ignore case
screen.getByText(/^hello world$/i) // full string match, ignore case
screen.getByText(/Hello W?oRlD/i) // substring match, ignore case, searches for "hello world" or "hello orld"

// Matching with a custom function:
screen.getByText((content, element) => content.startsWith('Hello'))
```


## Manual Queries

On top of the queries provided by the testing library, you can use the regular querySelector DOM API to query elements as an escape hatch (not recommended).

```tsx
// @testing-library/react
const {container} = render(<MyComponent />)
const foo = container.querySelector('[data-foo="bar"]')
```


## Querying Within Elements

To get the text 'hello' only within a section called 'messages', you could do:

```js
import {render, within} from '@testing-library/react'

const {getByText} = render(<MyComponent />)
const messages = getByText('messages')
const helloMessage = within(messages).getByText('hello')
```


## Browser extension

https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano/related
