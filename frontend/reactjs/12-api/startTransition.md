# Transitions

A transition is a new concept in React to distinguish between urgent and non-urgent updates.

- **Urgent updates** reflect direct interaction, like typing, clicking, pressing, and so on.
- **Transition updates** transition the UI from one view to another.

**Urgent updates** like typing, clicking, or pressing, need immediate response to match our intuitions about how physical objects behave. Otherwise they feel “wrong”.

However, **transitions** are different because the user doesn’t expect to see every intermediate value on screen.

*For example, when you select a filter in a dropdown, you expect the filter button itself to respond immediately when you click. However, the actual results may transition separately. A small delay would be imperceptible and often expected. And if you change the filter again before the results are done rendering, you only care to see the latest results.*

If a transition gets interrupted by the user (for example, by typing multiple characters in a row), React will throw out the stale rendering work that wasn’t finished and render only the latest update.


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

# `useTransition` hook


`useTransition` is a React Hook that lets you update the state without blocking the UI.

## Usage

### Marking a state update as a non-blocking transition

```jsx
import { useState, useTransition } from 'react';

export default function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);      
    });
  }

  return (
    <>
      <TabButton
        isActive={tab === 'about'}
        onClick={() => selectTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        onClick={() => selectTab('posts')}
      >
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        onClick={() => selectTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </>
  );
}
```

Try this live [example](https://codesandbox.io/s/mffivk?file=%2FApp.js&utm_medium=sandpack).


### Preventing unwanted loading indicators

In this example, the `PostsTab` component fetches some data using a Suspense-enabled data source. When you click the “Posts” tab, the `PostsTab` component suspends, causing the closest loading fallback to appear:

```jsx
function TabButton({ children, isActive, onClick }) {
  if (isActive) {
    return <b>{children}</b>
  }
  return (
    <button onClick={() => {
      onClick();
    }}>
      {children}
    </button>
  );
}

<Suspense fallback={<h1>🌀 Loading...</h1>}>
  <TabButton
    isActive={tab === 'about'}
    onClick={() => setTab('about')}
  >
    About
  </TabButton>
  <TabButton
    isActive={tab === 'posts'}
    onClick={() => setTab('posts')}
  >
    Posts
  </TabButton>
  <TabButton
    isActive={tab === 'contact'}
    onClick={() => setTab('contact')}
  >
    Contact
  </TabButton>
  
  <hr />
  {tab === 'about' && <AboutTab />}
  {tab === 'posts' && <PostsTab />}
  {tab === 'contact' && <ContactTab />}
</Suspense>
```

Hiding the entire tab container to show a loading indicator leads to a jarring user experience. If you add `useTransition` to `TabButton`, you can instead indicate display the pending state in the tab button instead. Notice that clicking “Posts” no longer replaces the entire tab container with a spinner:

```jsx
function TabButton({ children, isActive, onClick }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  return (
    <button onClick={() => {
      startTransition(() => {
        onClick();
      });
    }}>
      {children}
    </button>
  );
}
```

Try this live [example](https://codesandbox.io/s/qj166n?file=%2FTabButton.js&utm_medium=sandpack).

Note: Transitions will only “wait” long enough to avoid hiding already revealed content (like the tab container). If the Posts tab had a nested `<Suspense>` boundary, the transition would not “wait” for it.

## Troubleshooting

- [Updating an input in a transition doesn’t work](https://react.dev/reference/react/useTransition#updating-an-input-in-a-transition-doesnt-work)