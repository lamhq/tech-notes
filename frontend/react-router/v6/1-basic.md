# React Router

Version: 6

## Setup

```bash
yarn add react-router-dom
```

## Defining Routes

### Using router

Define routes using route config object:

```jsx
// router.tsx
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "teams",
        element: <Teams />,
        children: [
          {
            index: true,
            element: <LeagueStandings />,
          },
          {
            path: ":teamId",
            element: <Team />,
          },
          {
            path: "new",
            element: <NewTeamForm />,
          },
        ],
      },
    ],
  },
  {
    element: <PageLayout />,
    children: [
      {
        element: <Privacy />,
        path: "/privacy",
      },
      {
        element: <Tos />,
        path: "/tos",
      },
    ],
  }
]);
```

Render routes:

```tsx
// main.tsx
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```


### Using jsx

```jsx
// main.tsx
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

```jsx
// App.tsx
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
```


### Using router & jsx

```jsx
// router.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<h2>Index</h2>} />
      <Route path="one" element={<h2>One</h2>} />
      <Route path="two" element={<h2>Two</h2>} />
      <Route
        path="three"
        action={() => json({ ok: true })}
        element={
          <>
            <h2>Three</h2>
            <ImportantForm />
          </>
        }
      />
      <Route path="four" element={<h2>Four</h2>} />
      <Route path="five" element={<h2>Five</h2>} />
    </Route>
  )
);
```

```jsx
// main.jsx
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

## Route params

```jsx
let router = createBrowserRouter([
  {
    path: "teams",
    element: <Teams />,
    children: [
      {
        path: ":teamId",
        element: <Team />,
      },
    ]
  }
]);
```

The `:teamId` segment is a dynamic segment of the path pattern, meaning it doesn't match the URL statically (the actual characters) but it matches it dynamically. Any value can fill in for `:teamId`. Both `/teams/123` or `/teams/cupcakes` will match.

```jsx
import { useParams } from 'react-router-dom';

function Team() {
  // Get the userId param from the URL.
  let { teamId } = useParams();
  // ...
}
```


## Nested routes

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="teams" element={<Teams />}>
        <Route path=":teamId" element={<Team />} />
      </Route>
    </Route>
  </Routes>
</BrowserRouter>
```

Let's use the `/teams/firebirds` URL as an example. Above will render a React element tree like this:

```jsx
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

`App` and `<Teams>` need to render an outlet to render nested components:

```jsx
function App() {
  return (
    <div>
      <GlobalNav />
      <Outlet />
      <GlobalFooter />
    </div>
  );
}
```


## Layout

To define a layout component, use it as a `element` in a parent route like this:

```jsx
<Route element={<PageLayout />}>
  <Route path="/privacy" element={<Privacy />} />
  <Route path="/tos" element={<Tos />} />
</Route>
```

Don't forget to add an` <Outlet>` to your layout where you would like child route elements to be rendered. Using `{children}` will not work as expected.


## Index Routes

Index routes render in their parent route's outlet at the parent route's path (it does not have `path` attribute)

```jsx
<Route path="teams" element={<Teams />}>
  <Route index element={<LeagueStandings />} />
  {/* other Route */}
</Route>
```

if the URL were `/teams`, the element tree would be:

```jsx
<App>
  <Teams>
    <LeagueStandings />
  </Teams>
</App>
```


## Not found page

```jsx
let router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]
```


## Navigate API

```jsx
import { useNavigate } from "react-router-dom";

let navigate = useNavigate();

<button
  onClick={() => {
    navigate("/");
  }}
>
  Go Home
</button>
```

Go back

```js
navigate(-1);
```

Using component:

```jsx
import { Route, Navigate } from 'react-router-dom';

<Route index element={<Navigate to="account" replace />} />
```


## `<Link>`

- React Router will prevent the browser's default behavior and tell the history to push a new entry into the history stack when user click it.
- Still render a `<a href>` so all default accessibility concerns are met
- Don't prevent the browser's default behavior if it's a right click or command/control click to "open in new tab"

```jsx
import { Link } from 'react-router-dom';

<Link to="psg" />
```


### Relative Link

`<Link>` in nested routes inherit the route within which they are rendered.

```jsx
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<TeamDetail />} />
</Route>

function Teams() {
  return <Link to="psg" />
}
```

The full path for links in `Teams` page will be `/teams/psg`. They inherit the route within which they are rendered. 


### Setting state for a location

The `state` property can be used to set a stateful value for the new location. This value can subsequently be accessed via `useLocation()`.

```jsx
<Link to="new-path" state={{ some: "value" }} />
```

```js
let { state } = useLocation();
```


## `<NavLink>` and active state

A `<NavLink>` is a special kind of `<Link>` that knows whether or not it is "active" or "pending"

By default, an active class is added to a `<NavLink>` component when it is active so you can use CSS to style it.

The `className` prop works like a normal `className`, but you can also pass it a function.

The `style` prop works like a normal `style` prop, but you can also pass it a function

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/messages"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Messages
</NavLink>;
```


## Search Params (working with query string)

```jsx
import { Link, Route, Routes, useSearchParams } from "react-router-dom";

function Home() {
  let [searchParams, setSearchParams] = useSearchParams();

  // searchParams is a URLSearchParams object.
  // See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  let user = searchParams.get("user");
}
```


## Detect whether current location changes

```jsx
import { useLocation } from 'react-router-dom';

function App() {
  let location = useLocation();

  React.useEffect(() => {
    // Google Analytics
    ga('send', 'pageview');
  }, [location]);

  return (
    // ...
  );
}
```
