# Asynchronous Data Queries

## Synchronous

```jsx
const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
});

const currentUserNameState = selector({
  key: 'CurrentUserName',
  get: ({ get }) => {
    return tableOfUsers[get(currentUserIDState)].name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameState);
  return <div>{userName}</div>;
}

function MyApp() {
  return (
    <RecoilRoot>
      <CurrentUserInfo />
    </RecoilRoot>
  );
}
```

## Asynchronous

Simply return a `Promise` to a value instead of the value itself from a selector `get` callback.

If any dependencies change, the selector will be re-evaluated and execute a new query. The results are cached, so the query will only execute once per unique input.

```jsx
const currentUserNameQuery = selector({
  key: 'CurrentUserName',
  get: async ({ get }) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    return response.name;
  },
});
```

Wrapping your component with a `Suspense` boundary will catch any descendants that are still pending and render a fallback UI:

```jsx
function MyApp() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CurrentUserInfo />
      </React.Suspense>
    </RecoilRoot>
  );
}
```

## Error Handling

If the request has an error, this can be caught with a React `<ErrorBoundary>`

```jsx
const currentUserNameQuery = selector({
  key: 'CurrentUserName',
  get: async ({get}) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    if (response.error) {
      throw response.error;
    }
    return response.name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameQuery);
  return <div>{userName}</div>;
}

function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```

## Queries with Parameters

You can do that using the `selectorFamily` helper. Here's an example passing parameters from component's props:

```jsx
const userNameQuery = selectorFamily({
  key: 'UserName',
  get: userID => async () => {
    const response = await myDBQuery({userID});
    if (response.error) {
      throw response.error;
    }
    return response.name;
  },
});

function UserInfo({userID}) {
  const userName = useRecoilValue(userNameQuery(userID));
  return <div>{userName}</div>;
}

function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <UserInfo userID={1}/>
          <UserInfo userID={2}/>
          <UserInfo userID={3}/>
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```


## Data-Flow Graph

Here's an example of cascading query:

```jsx
const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: null,
});

const userInfoQuery = selectorFamily({
  key: 'UserInfoQuery',
  get: userID => async () => {
    const response = await myDBQuery({userID});
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

const currentUserInfoQuery = selector({
  key: 'CurrentUserInfoQuery',
  get: ({get}) => get(userInfoQuery(get(currentUserIDState))),
});

const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({get}) => {
    const {friendList} = get(currentUserInfoQuery);
    return friendList.map(friendID => get(userInfoQuery(friendID)));
  },
});

function CurrentUserInfo() {
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);
  const setCurrentUserID = useSetRecoilState(currentUserIDState);
  return (
    <div>
      <h1>{currentUser.name}</h1>
      <ul>
        {friends.map(friend =>
          <li key={friend.id} onClick={() => setCurrentUserID(friend.id)}>
            {friend.name}
          </li>
        )}
      </ul>
    </div>
  );
}

function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```


## Concurrent Requests

In the example above, the `friendsInfoQuery` uses a query to get the info for each friend. But, by doing this in a loop they are essentially serialized:

```js
return friendList.map(friendID => get(userInfoQuery(friendID)));
```

To run them in parallel, you can use a helper `waitForAll`:

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

You can use `waitForNone` to handle incremental updates to the UI with partial data:

```js
const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({get}) => {
    const {friendList} = get(currentUserInfoQuery);
    const friendLoadables = get(waitForNone(
      friendList.map(friendID => userInfoQuery(friendID))
    ));
    return friendLoadables
      .filter(({state}) => state === 'hasValue')
      .map(({contents}) => contents);
  },
});
```


## Pre-Fetching

For performance reasons you may wish to kick off fetching before rendering. That way the query can be going while we start rendering. The [React docs](https://reactjs.org/docs/concurrent-mode-suspense.html#start-fetching-early) give some examples.

Let's change the above example to initiate a fetch for the next user info as soon as the user clicks the button to change users:

```js
function CurrentUserInfo() {
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);

  const changeUser = useRecoilCallback(({snapshot, set}) => userID => {
    snapshot.getLoadable(userInfoQuery(userID)); // pre-fetch user info
    set(currentUserIDState, userID); // change current user to start new render
  });

  return (
    <div>
      <h1>{currentUser.name}</h1>
      <ul>
        {friends.map(friend =>
          <li key={friend.id} onClick={() => changeUser(friend.id)}>
            {friend.name}
          </li>
        )}
      </ul>
    </div>
  );
}
```


## Query Default Atom Values

Atom's default value can be retrieved from a selector

```js
const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: selector({
    key: 'CurrentUserID/Default',
    get: () => myFetchCurrentUserID(),
  }),
});
```


## Async Queries Without React Suspense

It is not necessary to use React Suspense for handling pending asynchronous selectors. You can also use the `useRecoilValueLoadable()` hook to determine the status during rendering:

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


## Query Refresh

Selector evaluation should always provide a consistent value for a given state. Selector evaluation functions should be idempotent for a given input, its result may be cached.

There are a few patterns you can use for forcing re-evaluation:

### Use a Request ID

```js
const userInfoQueryRequestIDState = atomFamily({
  key: 'UserInfoQueryRequestID',
  default: 0,
});

function useRefreshUserInfo(userID) {
  const setUserInfoQueryRequestID = useSetRecoilState(userInfoQueryRequestIDState(userID));
  return () => {
    setUserInfoQueryRequestID(requestID => requestID + 1);
  };
}

const userInfoQuery = selectorFamily({
  key: 'UserInfoQuery',
  get: userID => async ({get}) => {
    get(userInfoQueryRequestIDState(userID)); // Add request ID as a dependency
    const response = await myDBQuery({userID});
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

function CurrentUserInfo() {
  const currentUserID = useRecoilValue(currentUserIDState);
  const currentUserInfo = useRecoilValue(userInfoQuery(currentUserID));
  const refreshUserInfo = useRefreshUserInfo(currentUserID);

  return (
    <div>
      <h1>{currentUser.name}</h1>
      <button onClick={refreshUserInfo}>Refresh</button>
    </div>
  );
}
```