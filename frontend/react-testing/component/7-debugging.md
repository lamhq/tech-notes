# Debugging

## `screen.debug()`

This method is essentially a shortcut for `console.log(prettyDOM())`. It supports debugging the document, a single element, or an array of elements.

```tsx
import {screen} from '@testing-library/dom'

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
