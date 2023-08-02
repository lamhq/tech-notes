# Assertion

## Asserting elements are not present

if you want to make an assertion that an element is not present in the DOM, you can use `queryBy` APIs

```ts
const submitButton = screen.queryByText('submit')
expect(submitButton).toBeNull() // it doesn't exist

const submitButtons = screen.queryAllByText('submit')
expect(submitButtons).toHaveLength(0) // expect no elements
```

```js
import '@testing-library/jest-dom'

// use `queryBy` to avoid throwing an error with `getBy`
const submitButton = screen.queryByText('submit')
expect(submitButton).not.toBeInTheDocument()
```


## Custom matchers

- `toBeDisabled`
- `toBeEnabled`
- `toBeEmptyDOMElement`
- `toBeInTheDocument`
- `toBeInvalid`
- `toBeRequired`
- `toBeValid`
- `toBeVisible`
- `toContainElement`
- `toContainHTML`
- `toHaveAccessibleDescription`
- `toHaveAccessibleName`
- `toHaveAttribute`
- `toHaveClass`
- `toHaveFocus`
- `toHaveFormValues`
- `toHaveStyle`
- `toHaveTextContent`
- `toHaveValue`
- `toHaveDisplayValue`
- `toBeChecked`
- `toBePartiallyChecked`
- `toHaveErrorMessage`


## Reference

https://github.com/testing-library/jest-dom#custom-matchers