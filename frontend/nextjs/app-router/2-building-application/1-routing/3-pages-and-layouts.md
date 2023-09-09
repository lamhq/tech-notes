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
- It's not possible to pass data between a parent layout and its children.

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


## Templates

- Templates are similar to layouts in that they wrap each child layout or page.
- Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation.

There may be cases where you need those specific behaviors, and templates would be a more suitable option than layouts. For example:

- Enter/exit animations using CSS or animation libraries.
- Features that rely on `useEffect` (e.g logging page views) and `useState` (e.g a per-page feedback form).
- To change the default framework behavior.

We recommend using Layouts unless you have a specific reason to use Template.

A template can be defined by exporting a default React component from a `template.js` file.

```tsx filename="app/template.tsx" switcher
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

The rendered output of a route segment with a layout and a template will be as such:

```jsx filename="Output"
<Layout>
  {/* Note that the template is given a unique key. */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```


## Modifying `<head>`

In the `app` directory, you can modify the `<head>` HTML elements such as `title` and `meta` using the built-in SEO support.

Metadata can be defined by exporting a `metadata` object or `generateMetadata` function in a `layout.js` or `page.js` file.

```tsx filename="app/page.tsx" switcher
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js',
}

export default function Page() {
  return '...'
}
```

You should not manually add `<head>` tags such as `<title>` and `<meta>` to root layouts. Instead, you should use the Metadata API which automatically handles advanced requirements such as streaming and de-duplicating `<head>` elements.