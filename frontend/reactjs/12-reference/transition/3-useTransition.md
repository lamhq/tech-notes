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