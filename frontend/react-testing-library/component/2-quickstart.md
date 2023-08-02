# Quickstart

## Installation

Install required packages:

```sh
yarn add --dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

- `jest-dom` is a companion library for Testing Library that provides custom DOM element matchers for Jest.
- `jest-environment-jsdom` to inform Jest we're testing browser interactions through the DOM

Update your jest test setup file to import `@testing-library/jest-dom`.


```ts
// In your own jest-setup.js (or any other name)
import '@testing-library/jest-dom'

// In jest.config.js add (if you haven't already)
setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
```


## The component to test

```jsx
// Fetch.jsx
import React, {useState, useReducer} from 'react'
import axios from 'axios'

const initialState = {
  error: null,
  greeting: null,
}

function greetingReducer(state, action) {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        greeting: action.greeting,
      }
    }
    case 'ERROR': {
      return {
        error: action.error,
        greeting: null,
      }
    }
    default: {
      return state
    }
  }
}

export default function Fetch({url}) {
  const [{error, greeting}, dispatch] = useReducer(
    greetingReducer,
    initialState,
  )
  const [buttonClicked, setButtonClicked] = useState(false)

  const fetchGreeting = async url =>
    axios
      .get(url)
      .then(response => {
        const {data} = response
        const {greeting} = data
        dispatch({type: 'SUCCESS', greeting})
        setButtonClicked(true)
      })
      .catch(error => {
        dispatch({type: 'ERROR', error})
      })

  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting'

  return (
    <div>
      <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  )
}
```


## Writing the test

```jsx
// Fetch.spec.jsx
// import react-testing methods
import {render, fireEvent, screen} from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

// the component to test
import Fetch from './fetch'

// render the component
render(<Fetch url="/greeting" />)

// perform click action on element
fireEvent.click(screen.getByText('Load Greeting'))

// wait until the `get` request promise resolves and
// the component calls setState and re-renders,
// throwing an error if it cannot find an element
await screen.findByRole('heading')

// assert that the alert message is correct using
// toHaveTextContent, a custom matcher from jest-dom.
expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')

// assert that the button is not disabled using
// toBeDisabled, a custom matcher from jest-dom.
expect(screen.getByRole('button')).not.toBeDisabled()
```