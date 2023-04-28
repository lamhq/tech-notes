# Usage

Common problems and how to solve them in React

## Lazy load a page

Use `lazy` API.

Reference:

- [`lazy`](https://react.dev/reference/react/lazy)


## Displaying a fallback while content is loading

Use `<Suspense>` component.

References:

- [Displaying a fallback while content is loading](https://react.dev/reference/react/Suspense#displaying-a-fallback-while-content-is-loading)


## Prevent layout from hiding with fallback on navigation

Use `useTransition` hook or `startTransition`.

References:

- [Preventing already revealed content from hiding](https://react.dev/reference/react/Suspense#preventing-already-revealed-content-from-hiding)
- [Indicating that a transition is happening](https://react.dev/reference/react/Suspense#indicating-that-a-transition-is-happening)
- [Preventing unwanted loading indicators](https://react.dev/reference/react/useTransition#preventing-unwanted-loading-indicators)

## Implement "Search as you type" feature

Use `useDeferredValue` hook

References:

- [Showing stale content while fresh content is loading](https://react.dev/reference/react/useDeferredValue#showing-stale-content-while-fresh-content-is-loading)
- [Indicating that the content is stale](https://react.dev/reference/react/useDeferredValue#indicating-that-the-content-is-stale)


## Remove unwanted dependencies from `useEffect`

Use `useEffectEvent` (experimental) hook to move code that reference unwanted dependencies out of your `useEffect` code.

References:

- [Extracting non-reactive logic out of Effects](https://react.dev/learn/separating-events-from-effects#extracting-non-reactive-logic-out-of-effects)
- [Do you want to read a value without “reacting” to its changes?](https://react.dev/learn/removing-effect-dependencies#do-you-want-to-read-a-value-without-reacting-to-its-changes)


## Combine Providers

Let's create util to help us with this:

```jsx
type Providers = [ComponentType<any>, ComponentProps<any>?][];

const combineProviders = (providers: Providers): FC => providers.reduce(
  (AccumulatedProviders, [Provider, props = {}]) => ({ children }) => (
    <AccumulatedProviders>
      <Provider {...props}>
        <>{children}</>
      </Provider>
    </AccumulatedProviders>
  ),
  ({ children }) => <>{children}</>
);

export const AllProviders = CombineProviders([
  [MuiThemeProvider, { theme }],
  [MuiPickersUtilsProvider, { utils: DateFnsUtils }],
  [StylesProvider, { injectFirst: true }],
  [Provider, { store: configureStore() }],
  [Provider1],
  [Provider2],
  [MyComponent, {name: 'John']
]);
```

With this, we can now just pass an array of context providers and they will be combined from left to right:

```jsx
// AppContextProvider.tsx
import React from 'react';
import { ContextProvider1 } from '.../Context1';
import { ContextProvider2 } from '.../Context2';
import { ContextProvider3 } from '.../Context3';
import { ContextProvider4 } from '.../Context4';
import { combineComponents } from '.../utils/combineComponents;
const providers = [
  ContextProvider1,
  ContextProvider2,
  ContextProvider3,
  ContextProvider4
]
export const AppContextProvider = combineComponents(...providers);
```

```jsx
// index.tsx
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { AllProviders } from './AllProviders';

ReactDOM.render(
  <StrictMode>
    <AllProviders>
      <App />
    </AllProviders>
  </StrictMode>,
  document.getElementById('root')
);
```

References:
- [How to combine providers in React](https://egor-xyz.medium.com/how-to-combine-providers-in-react-e553a155d0b9)
- [Too many React Context providers](https://stackoverflow.com/questions/51504506/too-many-react-context-providers)
