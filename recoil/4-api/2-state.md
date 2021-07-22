# State

Recoil manages atom and selector state changes to know when to notify components subscribing to that selector to re-render. 

If an object stored in an **atom** was mutated directly it may bypass this and cause state changes without properly notifying subscribing components. To help detect bugs Recoil will freeze objects stored in atoms in development mode.

If an object value of a **selector** is mutated directly it may bypass this and avoid properly notifying subscribing components. To help detect bugs, Recoil will freeze selector value objects in development mode.


## atom

```ts
function atom<T>({
  key: string,
  default: T | Promise<T> | RecoilValue<T>,
  effects_UNSTABLE?: $ReadOnlyArray<AtomEffect<T>>,
}): RecoilState<T>
```

- `key` - A unique string used to identify the atom internally. This string should be unique with respect to other atoms and selectors in the entire application.
- `default` - The initial value of the atom or a `Promise` or another atom or selector representing a value of the same type.
- `effects_UNSTABLE` - An optional array of [Atom Effects](/docs/guides/atom-effects) for the atom.

You can initialize an atom either with a static value or with a `Promise` or a `RecoilValue` representing a value of the same type.  Because the `Promise` may be pending or the default selector may be asynchronous it means that the atom value may also be pending or throw an error when reading.


## selector

**Selectors** represent a function, or **derived state** in Recoil.  You can think of them as similar to an "idempotent" or "pure function" without side-effects that always returns the same value for a given set of dependency values.

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
}): RecoilValueReadOnly<T> | RecoilState<T>
```

```jsx
type GetRecoilValue = <T>(RecoilValue<T>) => T;
type SetRecoilState = <T>(RecoilState<T>, ValueOrUpdater<T>) => void;
type ValueOrUpdater<T> = T | DefaultValue | ((prevValue: T) => T | DefaultValue);

type ResetRecoilState = <T>(RecoilState<T>) => void;

type GetCallback = <Args, Return>(
  fn: ({snapshot: Snapshot}) => (...Args) => Return,
) => (...Args) => Return;
```

- `key` - A unique string used to identify the selector internally.
- `get` - A function that evaluates the value for the derived state. It may return either a value directly or a `Promise` or another atom or selector representing the same type. It is passed an object as the first parameter containing the following properties:
  - `get()` - a function used to retrieve values from other atoms/selectors. All atoms/selectors passed to this function will be implicitly added to a list of **dependencies** for the selector. If any of the selector's dependencies change, the selector will re-evaluate.
  - `getCallback()` - a function for accessing recoil state outside of selector. See [example](/#returning-objects-with-callbacks) below.
- `set?` - If this property is set, the selector will return **writeable** state. A function that is passed an object of callbacks as the first parameter and the new incoming value. The callbacks include:
  - `get()` - a function used to retrieve values from other atoms/selectors. This function will not subscribe the selector to the given atoms/selectors.
  - `set()` - a function used to set the values of upstream Recoil state.
  - `reset()` - a function used to reset to the default values of upstream Recoil state.
- `dangerouslyAllowMutability` - In some cases it may be desireable allow mutating of objects stored in selectors that don't represent state changes. Use this option to override freezing objects in development mode.


### Writeable Selectors

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

A `Loadable` object represents the current state of a Recoil atom or selector. A Loadable has the following interface:

- `state`: possible values are `'hasValue'`, `'hasError'`, or `'loading'`.
- `contents`:
  - If the state is `hasValue`, it is the actual value
  - if the state is `hasError` it is the Error object that was thrown
  - if the state is `loading`, then you can use `toPromise()` to get a `Promise` of the value.

Loadables also contain helper methods (unstable):

- `getValue()` - Method to access the value that matches the semantics of React Suspense and Recoil selectors (if it is still pending then it suspends execution or rendering to propagate the pending state).
- `map()` - Takes a function to transform the value of the Loadable and returns a new Loadable with the transformed value. It can also propagate thrown errors or suspense.
- `valueMaybe()` - Returns the value if available, otherwise returns undefined
- `valueOrThrow()` - Returns the value if available or throws an Error.


## `useRecoilState(state)`

This is the recommended hook to use when a component intends to read and write state.

This hook will implicitly subscribe the component to the given state.

This hook may throw if the state has an error or is pending asynchronous resolution.

```ts
function useRecoilState<T>(state: RecoilState<T>): [T, SetterOrUpdater<T>];

type SetterOrUpdater<T> = (T | (T => T)) => void;
```

## `useRecoilValue(state)`

This is the recommended hook to use when a component intends to read state without writing to it.

This hook will subscribe the component to re-render when the state is updated. This hook may throw if the state has an error or is pending asynchronous resolution.

```ts
function useRecoilValue<T>(state: RecoilValue<T>): T;
```

## `useSetRecoilState(state)`

This is the recommended hook to use when a component intends to write to state without reading it.

Using `useSetRecoilState()` allows a component to set the value without subscribing the component to re-render when the value changes.

```ts
function useSetRecoilState<T>(state: RecoilState<T>): SetterOrUpdater<T>;

type SetterOrUpdater<T> = (T | (T => T)) => void;
```

## `useRecoilStateLoadable(state)`

This hook will not throw an Error or Promise when reading from an asynchronous selector. Instead, this hook returns a `Loadable` object for the value along with the setter callback.

```ts
function useRecoilStateLoadable<T>(state: RecoilState<T>): [Loadable<T>, (T | (T => T)) => void]
```

```js
function UserInfo({userID}) {
  const [userNameLoadable, setUserName] = useRecoilStateLoadable(userNameQuery(userID));
  switch (userNameLoadable.state) {
    case 'hasValue':
      return <div>{userNameLoadable.contents}</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
  }
}
```

## `useRecoilValueLoadable(state)`

This hook will not throw an Error or Promise when reading from an asynchronous selector. Instead, this hook returns a `Loadable` object.

```ts
function useRecoilValueLoadable<T>(state: RecoilValue<T>): Loadable<T>
```

```js
function UserInfo({userID}) {
  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));
  switch (userNameLoadable.state) {
    case 'hasValue':
      return <div>{userNameLoadable.contents}</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
  }
}
```

## `useRecoilCallback(callback, deps)`

This hook is similar to `useCallback()`, but will also provide an API for your callbacks to work with Recoil state. 

Some motivations for using this hook may include:

- Asynchronously read Recoil state without subscribing a React component to re-render if the atom or selector is updated.
- Performing side-effects where you would like to also read or write to Recoil state.
- Pre-fetching data before rendering.

```ts
type CallbackInterface = {
  snapshot: Snapshot,
  gotoSnapshot: Snapshot => void,
  set: <T>(RecoilState<T>, (T => T) | T) => void,
  reset: <T>(RecoilState<T>) => void,
};

function useRecoilCallback<Args, ReturnValue>(
  callback: CallbackInterface => (...Args) => ReturnValue,
  deps?: $ReadOnlyArray<mixed>,
): (...Args) => ReturnValue
```

**Lazy Read Example**:

This example uses `useRecoilCallback()` to lazily read state without subscribing a component to re-render when the state changes.

```js
import {atom, useRecoilCallback} from 'recoil';

const itemsInCart = atom({
  key: 'itemsInCart',
  default: 0,
});

function CartInfoDebug() {
  const logCartItems = useRecoilCallback(({snapshot}) => async () => {
    const numItemsInCart = await snapshot.getPromise(itemsInCart);
    console.log('Items in cart: ', numItemsInCart);
  });

  return (
    <div>
      <button onClick={logCartItems}>Log Cart Items</button>
    </div>
  );
}
```