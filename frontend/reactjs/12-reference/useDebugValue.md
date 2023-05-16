# useDebugValue

`useDebugValue` is a React Hook that lets you add a label to a custom Hook in React DevTools.

```js
useDebugValue(value, format?)
```

Don’t add debug values to every custom Hook. It’s most valuable for custom Hooks that are part of shared libraries and that have a complex internal data structure that’s difficult to inspect.


## Parameters

- `value`: The value you want to display in React DevTools. It can have any type.
- `format` (optional): A formatting function.


## Usage

### Adding a label to a custom Hook 

```jsx
import { useDebugValue } from 'react';

function useOnlineStatus() {
  // ...
  useDebugValue(isOnline ? 'Online' : 'Offline');
  // ...
}
```

This gives components calling `useOnlineStatus` a label like `OnlineStatus: "Online"` when you inspect them:

![](https://react.dev/images/docs/react-devtools-usedebugvalue.png)