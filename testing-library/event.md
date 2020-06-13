# Firing Events

```js
// <button>Submit</button>
fireEvent(
  getByText(container, 'Submit'),
  new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  })
)

// <button>Submit</button>
const rightClick = { button: 2 }
fireEvent.click(getByText('Submit'), rightClick)
// default `button` property for click events is set to `0` which is a left click.
```


## target

```js
fireEvent.change(getByLabelText(/username/i), { target: { value: 'a' } })

// note: attempting to manually set the files property of an HTMLInputElement
// results in an error as the files property is read-only.
// this feature works around that by using Object.defineProperty.
fireEvent.change(getByLabelText(/picture/i), {
  target: {
    files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
  },
})
```


## dataTransfer

```js
fireEvent.drop(getByLabelText(/drop files here/i), {
  dataTransfer: {
    files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
  },
})
```


## Keyboard events

`keyPress`, `keyDown`, and `keyUp`.

```js
fireEvent.keyDown(domNode, { key: 'Enter', code: 'Enter' })

fireEvent.keyDown(domNode, { key: 'A', code: 'KeyA' })
```

