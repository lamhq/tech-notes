# API Reference

## `<RecoilRoot>`

### Props

- `initializeState?: (MutableSnapshot => void)`

An optional function that takes a [`MutableSnapshot`](/docs/api-reference/core/Snapshot#transforming-snapshots) to [initialize](/docs/api-reference/core/Snapshot#state-initialization) the `<RecoilRoot>` atom state.

```ts
class MutableSnapshot {
  set: <T>(RecoilState<T>, T | DefaultValue | (T => T | DefaultValue)) => void;
  reset: <T>(RecoilState<T>) => void;
}
```

- `override?: boolean`

Defaults to `true`. This prop only matters when this `<RecoilRoot>` is nested within another `<RecoilRoot>`.


### Using Multiple `<RecoilRoot>`'s

Multiple `<RecoilRoot>`'s  may co-exist and represent independent providers/stores of atom state; atoms will have distinct values within each root.

This behavior remains the same when you nest one root inside anther one (inner root will mask outer roots), unless you specify `override` to be `false` (see "Props").

```jsx
import {RecoilRoot} from 'recoil';

function AppRoot() {
  return (
    <RecoilRoot>
      <ComponentThatUsesRecoil />
    </RecoilRoot>
  );
}
```