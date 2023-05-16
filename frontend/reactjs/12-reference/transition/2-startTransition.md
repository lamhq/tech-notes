# `startTransition` API

`startTransition` lets you update the state without blocking the UI. It lets you mark a state update as a transition.

```js
startTransition(scope)
```

For example, if the user clicks a tab that take a long time to render. While it's rendering, they change their mind and click another tab. With `useTransition`, they can do that without waiting for the first re-render to finish.

How does it happen?

- When user click the first tab, React will start a transition to render the slow tab
- When user click another tab, React will start a transition to render the new tab and interrupts the render of slow tab. That's why you don't have to wait for the slow tab to be rendered before changing to the new tab.


## Parameters

`scope`: A function that updates some state by calling one or more `set`(state) functions


## Caveats

- A state update marked as a transition will be interrupted by other state updates.
- The function you pass to `startTransition` must be synchronous. 
- Transition updates can’t be used to control text inputs.
- If there are multiple ongoing transitions, React currently batches them together.
- You can call `startTransition` when `useTransition` is not available. For example, `startTransition` works outside components, such as from a data library.
- `startTransition` does not provide a way to track whether a transition is pending. To show a pending indicator while the transition is ongoing, you need `useTransition` instead.


## Usage

### Marking a state update as a non-blocking transition

You can mark a state update as a transition by wrapping it in a `startTransition` call:

```jsx
import { startTransition } from 'react';

function TabContainer() {
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

Transitions let you keep the user interface updates responsive even on slow devices. With a transition, your UI stays responsive in the middle of a re-render.
