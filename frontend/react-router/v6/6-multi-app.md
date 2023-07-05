# Multi app

## Requirements

- Create a code structure that allows easy addition/removal of modules.
- Each module will have its own routes and will be prefixed with a segment in the URL.
- Modules will be lazily loaded on demand to optimize bundle size.
- The layout will be rendered by the main app.


## Solution

- Each module will have an entry point to render its own routes.
- The main app's route will render all module's entry points with their corresponding prefix.
- Lazy loading will be performed using React Router's `lazy` API (v6).


## Implementation

The main route:
- Going to the homepage (`/`) will redirect the user to the customer's homepage (`/customer`).
- The customer module is prefixed with `/customer`.
- The sale module is prefixed with `/sale`.
- Routes that do not match any modules will be rendered as a notfound page.

```tsx
// router.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/customer" replace />,
      },
      {
        path: 'customer/*',
        async lazy() {
          const { CustomerModule } = await import('./customer/CustomerModule');
          return { Component: CustomerModule };
        },
      },
      {
        path: 'sale/*',
        async lazy() {
          const { SaleModule } = await import('./sale/SaleModule');
          return { Component: SaleModule };
        },
      },
      {
        path: '*',
        element: <p>Not found</p>,
      },
    ],
  },
]);
```

The layout:

```tsx
// Layout.tsx
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
            <Link to="/customer/account">My account</Link>
          </li>
          <li>
            <Link to="/sale/orders">Order History</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}
```

The app:

```tsx
// App.tsx
export function App() {
  return <RouterProvider router={router} />;
}
```

Customer module's entry point:
- The entry point component will include all pages of the module.
- Going to the customer's homepage (`/customer`) will redirect the user to `customer/account`.
- Links in modules are relative to the module's prefix and the page's path
- Routes that match the module's prefix but do not match any module's routes will be rendered as a notfound page.

```tsx
// CustomerModule.tsx
export function CustomerModule() {
  return (
    <Routes>
      <Route index element={<Navigate to="account" replace />} />
      <Route path="account" element={<AccountInfo />} />
      <Route path="account/edit" element={<AccountEdit />} />
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  );
}
```


## Pros

- Easy to add/remove modules. Simply edit the main router code (`router/tsx`) and remove the module's code


## Cons

- Currently, there's no way to lazy load pages in the module. The `lazy` props of `Route` component does not work.
- Redundant code. Every module must define a no match route.