# Assertion

## Asserting elements are not present

Assert on an element:

```js
const submitButton = screen.queryByText('submit')
expect(submitButton).toBeNull() // it doesn't exist
```

Assert on multiple elements:

```js
const submitButtons = screen.queryAllByText('submit')
expect(submitButtons).toHaveLength(0) // expect no elements
```

Use `.toBeInTheDocument()` matcher of [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom):

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