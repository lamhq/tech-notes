# State

Recoil manages atom and selector state changes to know when to notify components subscribing to that selector to re-render. 

If an object stored in an **atom** was mutated directly it may ypass this and cause state changes without properly notifying subscribing components. To help detect bugs Recoil will freeze objects stored in atoms in development mode.

If an object value of a **selector** is mutated directly it may bypass this and avoid properly notifying subscribing components. To help detect bugs, Recoil will freeze selector value objects in development mode.


## atom

```jsx
function atom<T>({
  key: string,
  default: T | Promise<T> | RecoilValue<T>,

  effects_UNSTABLE?: $ReadOnlyArray<AtomEffect<T>>,

  dangerouslyAllowMutability?: boolean,
}): RecoilState<T>
```

- `key` - A unique string used to identify the atom internally. This string should be unique with respect to other atoms and selectors in the entire application.
- `default` - The initial value of the atom or a `Promise` or another atom or selector representing a value of the same type.
- `effects_UNSTABLE` - An optional array of [Atom Effects](/docs/guides/atom-effects) for the atom.
- `dangerouslyAllowMutability` - Use this option to override freezing objects in development mode. 

You can initialize an atom either with a static value or with a `Promise` or a `RecoilValue` representing a value of the same type.  Because the `Promise` may be pending or the default selector may be asynchronous it means that the atom value may also be pending or throw an error when reading.


## selector

*Selectors* represent a function, or **derived state** in Recoil.  You can think of them as similar to an "idempotent" or "pure function" without side-effects that always returns the same value for a given set of dependency values.

If only a `get` function is provided, the selector is read-only and returns a `RecoilValueReadOnly` object.  If a `set` is also provided, it returns a writeable `RecoilState` object.

```jsx
function selector<T>({
  key: string,

  get: ({
    get: GetRecoilValue,
    getCallback: GetCallback,
  }) => T | Promise<T> | RecoilValue<T>,

  set?: (
    {
      get: GetRecoilValue,
      set: SetRecoilState,
      reset: ResetRecoilState,
    },
    newValue: T | DefaultValue,
  ) => void,

  dangerouslyAllowMutability?: boolean,
})
```

```jsx
type GetCallback =
  <Args, Return>(
    fn: ({snapshot: Snapshot}) => (...Args) => Return,
  ) => (...Args) => Return;

type GetRecoilValue = <T>(RecoilValue<T>) => T;
type SetRecoilState = <T>(RecoilState<T>, ValueOrUpdater<T>) => void;
type ResetRecoilState = <T>(RecoilState<T>) => void;
type ValueOrUpdater<T> = T | DefaultValue | ((prevValue: T) => T | DefaultValue);
```

- `key` - A unique string used to identify the selector internally. This string should be unique with respect to other atoms and selectors in the entire application. It needs to be stable across executions if used for persistence.
- `get` - A function that evaluates the value for the derived state. It may return either a value directly or an asynchronous `Promise` or another atom or selector representing the same type. It is passed an object as the first parameter containing the following properties:
  - `get()` - a function used to retrieve values from other atoms/selectors. All atoms/selectors passed to this function will be implicitly added to a list of **dependencies** for the selector. If any of the selector's dependencies change, the selector will re-evaluate.
  - `getCallback()` - a function for accessing recoil state outside of selector. See [example](/#returning-objects-with-callbacks) below.
- `set?` - If this property is set, the selector will return **writeable** state. A function that is passed an object of callbacks as the first parameter and the new incoming value. The callbacks include:
  - `get()` - a function used to retrieve values from other atoms/selectors. This function will not subscribe the selector to the given atoms/selectors.
  - `set()` - a function used to set the values of upstream Recoil state. The first parameter is the Recoil state and the second parameter is the new value. The new value may be an updater function or a `DefaultValue` object to propagate reset actions.
  - `reset()` - a function used to reset to the default values of upstream Recoil state. The only parameter is the Recoil state.
- `dangerouslyAllowMutability` - In some cases it may be desireable allow mutating of objects stored in selectors that don't represent state changes. Use this option to override freezing objects in development mode.

### Writeable Selectors

This selector transforms the data, so needs to check if the incoming value is a `DefaultValue`.

```jsx
const transformSelector = selector({
  key: 'TransformSelector',
  get: ({get}) => get(myAtom) * 100,
  set: ({set}, newValue) =>
    set(myAtom, newValue instanceof DefaultValue ? newValue : newValue / 100),
});
```

### Asynchronous

Selectors may also have asynchronous evaluation functions and return a `Promise` to the output value.

```jsx
import {selector, useRecoilValue} from 'recoil';

const myQuery = selector({
  key: 'MyDBQuery',
  get: async () => {
    const response = await fetch(getMyRequestUrl());
    return response.json();
  },
});

function QueryResults() {
  const queryResults = useRecoilValue(myQuery);

  return (
    <div>
      {queryResults.foo}
    </div>
  );
}

function ResultsSection() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <QueryResults />
    </React.Suspense>
  );
}
```

### Returning objects with callbacks

Sometimes selectors can be used to return objects that contain callbacks. It may be helpful for these callbacks to access Recoil state, such as for querying typeahead values or click handlers.

The following example uses a selector to generate menu items with a click handler that accesses Recoil state.

```jsx
const menuItemState = selectorFamily({
  key: 'MenuItem',
  get: itemID => ({get, getCallback}) => {
    const name = get(itemNameQuery(itemID));
    const onClick = getCallback(({snapshot}) => async () => {
      const info = await snapshot.getPromise(itemInfoQuery(itemID));
      displayInfoModal(info);
    });
    return {
      title: `Show info for ${name}`,
      onClick,
    };
  },
});
```

## `Loadable`

TBC