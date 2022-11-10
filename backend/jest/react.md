# React

## Basic

```tsx
// CheckboxWithLabel.tsx
import React from 'react';

interface CheckboxWithLabelProps {
  labelOn: string;
  labelOff: string;
}

export default function CheckboxWithLabel(props: CheckboxWithLabelProps): React.ReactElement {
  const { labelOn, labelOff } = props;
  const [isChecked, setChecked] = React.useState(false);

  function onChange(): void {
    setChecked(!isChecked);
  }

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {isChecked ? labelOn : labelOff}
    </label>
  );
}
```

```tsx
// CheckboxWithLabel.spec.tsx
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import CheckboxWithLabel from './CheckboxWithLabel';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('CheckboxWithLabel changes the text after click', () => {
  const { queryByLabelText, getByLabelText } = render(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});
```


## Checking element's existence by css class

```jsx
import renderer from 'react-test-renderer';
import React from 'react';
import Alert from './Alert';
import { cleanup, render } from '@testing-library/react';

describe('Alert display component', () => {
  afterEach(cleanup);

  it('should renders success message', () => {
    const { container } = render(<Alert type="success" message="Test" />);
    expect(container.querySelector('.euiCallOut--success')).toBeTruthy();
  });
});
```


## Mocking context value

```jsx
import React from 'react';
import Alert from './Alert';
import AlertContext, { IAlertContextValue } from '../contexts/alert';
import { cleanup, render } from '@testing-library/react';

describe('Alert container component', () => {
  afterEach(cleanup);

  it('should renders message', () => {
    const contextValue: IAlertContextValue = {
      alert: { type: 'success', message: 'My success message.' },
      alertSuccess: jest.fn(),
      alertError: jest.fn(),
      alertWarning: jest.fn(),
      closeAlert: jest.fn(),
    };
    const { queryByText } = render(
      <AlertContext.Provider value={contextValue}>
        <Alert />
      </AlertContext.Provider>,
    );
    expect(queryByText(/My success message/i)).toBeTruthy();
  });
});
