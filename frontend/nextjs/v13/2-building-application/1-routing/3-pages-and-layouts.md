# Pages and Layouts

## Pages

You can define pages by exporting a component from a `page.js` file.

```tsx
// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return <h1>Hello, Home page!</h1>
}
```


## Layouts

- A layout is UI that is **shared** between multiple pages. 
- On navigation, layouts preserve state, remain interactive, and do not re-render.
- Layouts can also be nested.
- You can define a layout by `default` exporting a React component from a `layout.js` file. The component should accept a `children` prop that will be populated with a child layout or a child page during rendering.

```tsx
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
 
      {children}
    </section>
  )
}
```

- Any route segment can optionally define its own Layout. These layouts will be shared across all pages in that segment.
- You can use Route Groups to opt specific route segments in and out of shared layouts.
- Layouts are Server Components by default but can be set to a Client Component.
- Layouts can fetch data.
- Passing data between a parent layout and its children is not possible. However, you can fetch the same data in a route more than once, and React will automatically dedupe the requests without affecting performance.
- Layouts do not have access to the current route segment(s).


### Root Layout (Required)

- The root layout is defined at the top level of the `app` directory and applies to all routes.
- This layout enables you to modify the initial HTML returned from the server.

```tsx filename="app/layout.tsx" switcher
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Nesting Layouts

- Layouts in a route are **nested** by default. Each parent layout wraps child layouts below it using the React `children` prop.
