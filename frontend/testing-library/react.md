# React Testing Library


## Mock api request

```js
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/greeting', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({ greeting: 'hello there' }))
  })
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())
```


## Render component

```js
// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
// the component to test
import Fetch from '../fetch'

render(<Fetch url="/greeting" />)
```


## Firing Event

```js
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
fireEvent.click(screen.getByText('Load Greeting'))

// wait until the `get` request promise resolves and
// the component calls setState and re-renders.
// `waitFor` waits until the callback doesn't throw an error

await waitFor(() =>
  // getByRole throws an error if it cannot find an element
  screen.getByRole('heading')
)
```

```js
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

test('change values via the fireEvent.change method', () => {
  const handleChange = jest.fn()
  const { container } = render(<input type="text" onChange={handleChange} />)
  const input = container.firstChild
  fireEvent.change(input, { target: { value: 'a' } })
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(input.value).toBe('a')
})

test('select drop-downs must use the fireEvent.change', () => {
  const handleChange = jest.fn()
  const { container } = render(
    <select onChange={handleChange}>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
  )
  const select = container.firstChild
  const option1 = container.getElementsByTagName('option').item(0)
  const option2 = container.getElementsByTagName('option').item(1)

  fireEvent.change(select, { target: { value: '2' } })

  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(option1.selected).toBe(false)
  expect(option2.selected).toBe(true)
})

test('checkboxes (and radios) must use fireEvent.click', () => {
  const handleChange = jest.fn()
  const { container } = render(
    <input type="checkbox" onChange={handleChange} />
  )
  const checkbox = container.firstChild
  fireEvent.click(checkbox)
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(checkbox.checked).toBe(true)
})
```


## Assert

```js
import '@testing-library/jest-dom/extend-expect'

test('loads and displays greeting', async () => {
  render(<Fetch url="/greeting" />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await waitFor(() => screen.getByRole('heading'))

  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toHaveAttribute('disabled')
})

test('handlers server error', async () => {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<Fetch url="/greeting" />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
  expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
})
```

```js
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('renders a message', () => {
  const { container, getByText } = render(<Greeting />)
  expect(getByText('Hello, world!')).toBeInTheDocument()
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h1>Hello, World!</h1>
  `)
})
```


## Custom Render

```js
// test-utils.js
import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'my-ui-lib'
import { TranslationProvider } from 'my-i18n-lib'
import defaultStrings from 'i18n/en-x-default'

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme="light">
      <TranslationProvider messages={defaultStrings}>
        {children}
      </TranslationProvider>
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
```

```js
// my-component.test.js
import { render, fireEvent } from '../test-utils';
```

