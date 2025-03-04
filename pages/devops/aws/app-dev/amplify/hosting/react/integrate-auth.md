# Integrate Authentication

Create a login UI for your React app.

## Install Amplify UI

```sh
npm install @aws-amplify/ui-react
```


## User APIs

The `withAuthenticator` HOC provides these props to the wrapped component:
- `user`
- `signUp`
- `signIn`
- `signOut`
- `forgotPassword`

First, define you component:

```tsx
import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";

type UserPageProps = {
  signOut?: UseAuthenticator["signOut"]; //() => void;
  user?: AuthUser;
};

function UserPage({ signOut, user }: UserPageProps) {
  return (
    <div>
      <h2 level={1}>Hello {user.username}</h2>
      <button onClick={signOut}>Sign out</button>
      ...
    </div>
  );
}
```

Import the `withAuthenticator` HOC and wrap your export:

```tsx
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default withAuthenticator(App);
```
