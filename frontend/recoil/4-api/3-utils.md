# Utils

## `atomFamily`

Return a function which provides the `RecoilState` atom based on the parameters you pass in.

```ts
function atomFamily<T, Parameter>({
  key: string,

  default:
    | RecoilValue<T>
    | Promise<T>
    | T
    | (Parameter => T | RecoilValue<T> | Promise<T>),

  effects_UNSTABLE?:
    | $ReadOnlyArray<AtomEffect<T>>
    | (P => $ReadOnlyArray<AtomEffect<T>>),
}): Parameter => RecoilState<T>
```

```js
const viewWidthForPaneState = atomFamily<number, PaneID>({
  key: 'ViewWidthForPane',
  default: 42,
});

function PaneView() {
  const paneID = useContext(PaneIDContext);
  const viewWidth = useRecoilValue(viewWidthForPaneState(paneID));
  ...
}
```

### Family Defaults

The default value of `atomFamily` can accept a function which takes the parameter value and returns the actual default value. For dynamic defaults based on other state use a `selectorFamily()`:

```js
const myAtomFamily = atomFamily({
  key: ‘MyAtom’,
  default: selectorFamily({
    key: 'MyAtom/Default',
    get: param => ({get}) => {
      const otherAtomValue = get(otherState);
      return computeDefaultUsingParam(otherAtomValue, param);
    },
  }),
});
```

### Parameter type

It is important to only use parameters which are primitives or simple compound objects containing primitives. Custom classes or functions are not allowed.


## `selectorFamily(options)`

The `selectorFamily()` utility returns a function which can be called with user-defined parameters and returns a selector. Each unique parameter value will return the same memoized selector instance.

```ts
function selectorFamily<T, Parameter>({
  key: string,

  get: Parameter => ({get: GetRecoilValue}) => Promise<T> | RecoilValue<T> | T,

  dangerouslyAllowMutability?: boolean,
}): Parameter => RecoilValueReadOnly<T>
```

```js
const myDataQuery = selectorFamily({
  key: 'MyDataQuery',
  get: (queryParameters) => async ({get}) => {
    const response = await asyncDataRequest(queryParameters);
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
});

function MyComponent() {
  const data = useRecoilValue(myDataQuery({userID: 132}));
  return <div>...</div>;
}
```

## `constSelector(constant)`

A **selector** which always provides a constant value. The value used as a constant is restricted to types that may be serialized using the Recoil serialization.

```ts
function constSelector<T: Parameter>(constant: T): RecoilValueReadOnly<T>
```

## `errorSelector(message)`

A **selector** which always throws the provided error

```ts
function errorSelector(message: string): RecoilValueReadOnly
```

```js
const myAtom = atom({
  key: 'My Atom',
  default: errorSelector('Attempt to use Atom before initialization'),
});
```


## `noWait(state)`

A selector helper that will return a `Loadable` for the current state of the provided `atom` or `selector`.

It is similar to `useRecoilValueLoadable()` except that it is a selector instead of a hook. 

It can be used by other Recoil selectors as well as hooks.

```ts
function noWait<T>(state: RecoilValue<T>): RecoilValueReadOnly<Loadable<T>>
```

```js
const myQuery = selector({
  key: 'MyQuery',
  get: ({get}) => {
    const loadable = get(noWait(dbQuerySelector));

    return {
      hasValue: {data: loadable.contents},
      hasError: {error: loadable.contents},
      loading: {data: 'placeholder while loading'},
    }[loadable.state];
  }
})
```

## `waitForAll(dependencies)`

A helper which allows us to concurrently evaluate multiple asynchronous dependencies.

```ts
function waitForAll(dependencies: Array<RecoilValue<>>):
  RecoilValueReadOnly<UnwrappedArray>
```

```js
function FriendsInfo() {
  const [friendA, friendB] = useRecoilValue(
    waitForAll([friendAState, friendBState])
  );
  return (
    <div>
      Friend A Name: {friendA.name}
      Friend B Name: {friendB.name}
    </div>
  );
}
```

```js
const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({get}) => {
    const {friendList} = get(currentUserInfoQuery);
    const friends = get(waitForAll(
      friendList.map(friendID => userInfoQuery(friendID))
    ));
    return friends;
  },
});
```

## `waitForAllSettled(dependencies)`

A helper that returns a set of `Loadable` for the current state of the requested dependencies. It waits until at least all of the dependencies are either in a value state, or an error state.

```ts
function waitForAllSettled(dependencies: Array<RecoilValue<>>):
  RecoilValueReadOnly<UnwrappedArrayOfLoadables>
```

## `waitForNone(dependencies)`

A helper that returns a set of `Loadable` for the current state of the requested dependencies.

It is similar to `waitForAll()`, except that it returns immediately and returns a Loadable for each dependency instead of the values directly.

It is similar to `noWait()`, except that it allows requesting multiple dependencies at once.

```ts
function waitForNone(dependencies: Array<RecoilValue<>>):
  RecoilValueReadOnly<UnwrappedArrayOfLoadables>
```  

## `waitForAny(dependencies)`

A helper that returns a set of `Loadable` for the current state of the requested dependencies. It waits until at least one of the dependencies are available.

```ts
function waitForAny(dependencies: Array<RecoilValue<>>):
  RecoilValueReadOnly<UnwrappedArrayOfLoadables>
```