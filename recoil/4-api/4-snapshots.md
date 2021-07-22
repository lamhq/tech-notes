# Snapshot

## class `Snapshot`

A `Snapshot` object represents an immutable snapshot of the state of Recoil atoms.

It is mostly useful for dev tools, global state synchronization, history navigation, etc.

```ts
class Snapshot {
  // Accessors to inspect snapshot state
  getLoadable: <T>(RecoilValue<T>) => Loadable<T>;
  getPromise: <T>(RecoilValue<T>) => Promise<T>;

  // API to transform snapshots for transactions
  map: (MutableSnapshot => void) => Snapshot;
  asyncMap: (MutableSnapshot => Promise<void>) => Promise<Snapshot>;
}
```

## Obtaining Snapshots

- `useRecoilCallback()`
- `useRecoilSnapshot()`

## Reading Snapshots

Snapshots can be used to read atom state and evaluate selectors' derived state. `getLoadable()` provides a `Loadable` with the state of the atom or selector in this Snapshot.

```js
function MyComponent() {
  const logState = useRecoilCallback(({snapshot}) => () => {
    console.log("State: ", snapshot.getLoadable(myAtom).contents);

    const newSnapshot = snapshot.map(({set}) => set(myAtom, 42));
  });
}
```

## Recoil State Initialization

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