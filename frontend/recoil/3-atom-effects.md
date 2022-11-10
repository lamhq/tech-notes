# Atom Effects

## Concepts

Atom Effects is an API for managing side-effects and initializing Recoil atoms. They have a variety of useful applications such as:

- state persistence
- state synchronization
- managing history
- logging

An atom effect is a function with the following definition:

```ts
type AtomEffect<T> = ({
  node: RecoilState<T>, // A reference to the atom itself
  trigger: 'get' | 'set', // The action which triggered initialization of the atom

  // Callbacks to set or reset the value of the atom.
  // This can be called from the atom effect function directly to initialize the
  // initial value of the atom, or asynchronously called later to change it.
  setSelf: (
    | T
    | DefaultValue
    | Promise<T | DefaultValue> // Only allowed for initialization at this time
    | ((T | DefaultValue) => T | DefaultValue),
  ) => void,
  resetSelf: () => void,

  // Subscribe to changes in the atom value.
  // The callback is not called due to changes from this effect's own setSelf().
  onSet: (
    (newValue: T | DefaultValue, oldValue: T | DefaultValue) => void,
  ) => void,

}) => void | () => void; // Optionally return a cleanup handler
```


## Usage

Atom effects are attached to atoms via the `effects_UNSTABLE` property. Each atom can reference an array of these atom effect functions which are called in priority order when the atom is initialized. The atom effect function may return an optional cleanup handler to manage cleanup side-effects.

```ts
const myState = atom({
  key: 'MyKey',
  default: null,
  effects_UNSTABLE: [
    // atom effect func 1
    () => {
      ...effect 1...
      return () => ...cleanup effect 1...;
    },
    // atom effect func 2
    () => { ...effect 2... },
  ],
});
```

**Atom families** also support parameterized or non-parameterized effects:

```ts
const myStateFamily = atomFamily({
  key: 'MyKey',
  default: null,
  effects_UNSTABLE: param => [
    () => {
      ...effect 1 using param...
      return () => ...cleanup effect 1...;
    },
    () => { ...effect 2 using param... },
  ],
});
```


## Logging

```ts
const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: null,
  effects_UNSTABLE: [
    ({onSet}) => {
      onSet(newID => {
        console.debug("Current user ID:", newID);
      });
    },
  ],
});
```


## Saving state change history

```ts
const history: Array<{
  label: string,
  undo: () => void,
}> = [];

const historyEffect = name => ({setSelf, onSet}) => {
  onSet((newValue, oldValue) => {
    history.push({
      label: `${name}: ${JSON.serialize(oldValue)} -> ${JSON.serialize(newValue)}`,
      undo: () => {
        setSelf(oldValue);
      },
    });
  });
};

const userInfoState = atomFamily({
  key: 'UserInfo',
  default: null,
  effects_UNSTABLE: userID => [
    historyEffect(`${userID} user info`),
  ],
});
```


## State Synchronization

Calling `setSelf()` from the effect will initialize the atom to that value and will be used for the initial render. If the atom is reset, it will revert to the `default` value, not the initialized value.

```ts
const syncStorageEffect = userID => ({setSelf, onSet, trigger}) => {
  // Initialize atom value to the remote storage state
  if (trigger === 'get') { // Avoid expensive initialization
    setSelf(myRemoteStorage.get(userID)); // Call synchronously to initialize
  }

  // Subscribe to remote storage changes and update the atom value
  myRemoteStorage.onChange(userID, userInfo => {
    setSelf(userInfo); // Call asynchronously to change value
  });

  // Subscribe to local changes and update the server value
  onSet(userInfo => {
    myRemoteStorage.set(userID, userInfo);
  });

  // Cleanup remote storage subscription
  return () => {
    myRemoteStorage.onChange(userID, null);
  };
};

const userInfoState = atomFamily({
  key: 'UserInfo',
  default: null,
  effects_UNSTABLE: userID => [
    historyEffect(`${userID} user info`),
    syncStorageEffect(userID),
  ],
});
```


## Local Storage Persistence

```ts
const localStorageEffect = key => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet(newValue => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
  effects_UNSTABLE: [
    localStorageEffect('current_user'),
  ]
});
```


## Asynchronous Storage Persistence

If your persisted data needs to be retrieved asynchronously, you can either use a `Promise` in the `setSelf()` function or call it asynchronously.

### Initialize with Promise

By synchronously calling `setSelf()` with a `Promise`, you'll be able to wrap the components inside of the <`RecoilRoot/>` with a `<Suspense/>` component to show a fallback while waiting for Recoil to load the persisted values. `<Suspense>` will show a fallback until the `Promise` provided to `setSelf()` resolves.

If the atom is set to a value before the `Promise` resolves then the initialized value will be ignored.

Note that if the `atoms` later are "reset", they will revert to their default value, and not the initialized value.

```ts
const localForageEffect = key => ({setSelf, onSet}) => {
  setSelf(localForage.getItem(key).then(savedValue =>
    savedValue != null
      ? JSON.parse(savedValue)
      : new DefaultValue() // Abort initialization if no value was stored
  ));

  onSet(newValue => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
  effects_UNSTABLE: [
    localForageEffect('current_user'),
  ]
});
```

### Asynchronous setSelf()

TBC