# Setup

## Custom Render

It's often useful to define a custom render method that includes things like global context providers, data stores, etc.

To make this available globally, one approach is to define a utility file that re-exports everything from **React Testing Library**

```tsx
// test-utils.tsx
import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'

import {ThemeProvider} from 'my-ui-lib'
import {TranslationProvider} from 'my-i18n-lib'
import defaultStrings from 'i18n/en-x-default'

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider theme="light">
      <TranslationProvider messages={defaultStrings}>
        {children}
      </TranslationProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}
```

```tsx
// my-component.test.tsx
import { render, fireEvent } from '../test-utils';

// ...
```