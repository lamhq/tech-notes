# Lazy loading routes

## Using `route.lazy`

Pros:
- No flickering issue. Allow showing stale content until new route loaded.
- Loading state is handled in central place (layout component). No need to use `<Suspense>` for every imported components.

Cons:
- Require a named export `Component` from lazy imported modules. Cannot use component meaningful names.
- Tightly coupled to React Router v6 library.

Caveat:

- Require `createBrowserRouter`, not work with `<BrowserRouter>` 

Define lazy imported modules:

```tsx
// Page1.tsx
export function Component() {
  return <p>content 1</p>;
}

// Page2.tsx
export function Component() {
  return <p>content 2</p>;
}
```

The layout component will define routes and import modules:

```jsx
import { Outlet, Link, createBrowserRouter, RouterProvider, useNavigation } from 'react-router-dom';

function Layout() {
  const navigation = useNavigation();

  return (
    <div>
      <div>{navigation.state !== 'idle' && <p>Navigation in progress...</p>}</div>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-1">Page 1</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <div>
            <h2>Home</h2>
          </div>
        ),
      },
      {
        path: 'page-1',
        lazy: () => import('./Page1'),
      },
      {
        path: 'page-2',
        lazy: () => import('./Page2'),
      },
    ],
  },
]);

export function LazyLoadPageDemo() {
  return <RouterProvider router={router} />;
}
```


## Using `React.lazy`

Pros:
- Use React API `lazy` for import modules. Compatible with older React Router library versions.

Cons:
- Require a default export from imported modules.
- Require `<Suspense>` component for every lazy imported modules.
- Cause flickering issue when changing routes.

```jsx
// Page1.tsx
export default function Page1() {
  return <p>content 1</p>;
}

// Page2.tsx
export default function Page2() {
  return <p>content 2</p>;
}
```

```jsx
import { Link, Outlet, Route, Routes, BrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

function withSuspense(Component: ReturnType<typeof lazy>) {
  return function WithSuspense() {
    return (
      <Suspense fallback={<>Loading...</>}>
        <Component />
      </Suspense>
    );
  };
}

const Page1 = withSuspense(lazy(() => import('./Page1')));
const Page2 = withSuspense(lazy(() => import('./Page2')));

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-1">Page 1</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export function LazyLoadPageDemo() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="page-1" element={<Page1 />} />
          <Route path="page-2" element={<Page2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```