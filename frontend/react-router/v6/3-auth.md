# Auth

This demonstrates how to restrict access to routes to authenticated users.

Be sure to pay attention to the following features:

- The use of the `useNavigate()` hook and the `<Navigate>` component for navigating both imperatively after the login form is submitted and declaratively when a non-authenticated user visits a particular route
- The use of `location.state` to preserve the previous location so you can send the user there after they authenticate
- The use of `navigate("...", { replace: true })` to replace the `/login` route in the history stack so the user doesn't return to the login page when clicking the back button after logging in

Define a context to store authenticated user info:

```js
interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
  return React.useContext(AuthContext);
}
```

Define the component that responsible for storing and providing authentication context:

```jsx
function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

Define the component that check authentication, redirect user to login page if not authenticated, else render the protected component (as children):

```jsx
function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
```

Define a login page that perform authentication and send user back to the page they tried to visit:

```jsx
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;

    auth.signin(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
```

The root component that define routes and providers:

```jsx
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
```