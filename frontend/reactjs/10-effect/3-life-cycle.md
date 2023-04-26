# Lifecycle of Reactive Effects

An Effect can only do two things: to start synchronizing something, and later to stop synchronizing it.

This cycle can happen multiple times if your Effect depends on props and state that change over time.


## Synchronization may happen more than once

Imagine this `ChatRoom` component receives a `roomId` prop that the user picks in a dropdown.

```jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId /* "general" */ }) {

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Connects to the "general" room
    connection.connect();
    return () => {
      connection.disconnect(); // Disconnects from the "general" room
    };
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>;
}
```

Let’s say that initially the user picks the "general" room as the `roomId`. Your app displays the "general" chat room.

```jsx
// roomId: "general"
return <h1>Welcome to the {roomId} room!</h1>;
```

After the UI is displayed, React will run your Effect to **start synchronizing**. It connects to the "general" room:

```js
// Connects to the "general" room
const connection = createConnection(serverUrl, roomId);
connection.connect();
```

Later, the user picks a different room in the dropdown (for example, "travel"). First, React will update the UI:

```jsx
// roomId: "travel"
return <h1>Welcome to the {roomId} room!</h1>;
```

The `roomId` prop has changed, At this point, React will do two things:

1. Stop synchronizing with the old roomId (disconnect from the "general" room)
2. Start synchronizing with the new roomId (connect to the "travel" room)

To **stop synchronizing**, React will call the cleanup function that your Effect returned after connecting to the "general" room:

```js
connection.disconnect(); // Disconnects from the "general" room
```

Then React will run the Effect that you’ve provided during this render. This time, `roomId` is "travel" so it will **start synchronizing** to the "travel" chat room:

```js
// Connects to the "travel" room
const connection = createConnection(serverUrl, roomId);
connection.connect();
```

Let’s recap everything that’s happened from the ChatRoom component’s perspective:

1. `ChatRoom` mounted with `roomId` set to "general"
1. `ChatRoom` updated with `roomId` set to "travel"
1. `ChatRoom` updated with `roomId` set to "music"
1. `ChatRoom` unmounted

During each of these points in the component’s lifecycle, your Effect did different things:

1. Your Effect connected to the "general" room
1. Your Effect disconnected from the "general" room and connected to the "travel" room
1. Your Effect disconnected from the "travel" room and connected to the "music" room
1. Your Effect disconnected from the "music" room


## How React knows that it needs to re-synchronize the Effect 

React knew that your Effect needed to re-synchronize after `roomId` changes. It’s because you told React that its code depends on `roomId` by including it in the list of dependencies:

```js
useEffect(() => {
  // ...
}, [roomId]); // So you tell React that this Effect "depends on" roomId
```


## Reactive values

**Props, state, and other values declared inside the component are reactive because they’re calculated during rendering and participate in the React data flow**.

Reactive values must be included in dependencies:

```js
function ChatRoom({ roomId }) { // Props change over time
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // State may change over time

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Your Effect reads props and state
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]); // So you tell React that this Effect "depends on" on props and state
  // ...
}
```


## Effect with empty dependencies

The empty `[]` dependency array means this Effect connects to the chat room only when the component mounts, and disconnects only when the component unmounts.

```js
const serverUrl = 'https://localhost:1234';
const roomId = 'general';

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ All dependencies declared
  // ...
}
```
