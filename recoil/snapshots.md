# Snapshot

## State Initialization

The `<RecoilRoot>` component and `snapshot_UNSTABLE()` factory take an optional initializeState prop for initializing the state via a `MutableSnapshot`.

```tsx
function MyApp() {
  function initializeState({set}) {
    set(myAtom, 'foo');
  }

  return (
    <RecoilRoot initializeState={initializeState}>
      ...
    </RecoilRoot>
  );
}
```