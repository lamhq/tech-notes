# Lazy loading routes

Define lazy imported modules:

```tsx
// Page1.tsx
export function Page1() {
  return <p>content 1</p>;
}

// Page2.tsx
export function Page2() {
  return <p>content 2</p>;
}
```


## Using `route.lazy` (recommended)

Pros:
- No flickering issue. Allow showing stale content until new route is loaded.
- Loading state is handled in central place (layout component). No need to use `<Suspense>` for every imported components.

Cons:
- Only supported in React Router v6 library.

Caveat:

- Require `createBrowserRouter`, not work with `<BrowserRouter>` 


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
        path: 'page-1',
        async lazy() {
          const { Page1 } = await import('./Page1');
          return { Component: Page1 };
        },
      },
      {
        path: 'page-2',
        async lazy() {
          const { Page2 } = await import('./Page2');
          return { Component: Page2 };
        },
      },
      {
        index: true,
        element: (
          <div>
            <h2>Home</h2>
          </div>
        ),
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
- Use React `lazy` API for import modules. no need for external libraries.

Cons:
- Require wrapping `<Suspense>` component for every lazy imported modules.
- Cause flickering issue when changing routes. Cannot be fixed with `useTransition` when integrating with external libraries (e.g. React Router).


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

const Page1 = withSuspense(
  lazy(() => import('./Page1').then((module) => ({ default: module.Page1 })))
);
const Page2 = withSuspense(
  lazy(() => import('./Page2').then((module) => ({ default: module.Page2 })))
);

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