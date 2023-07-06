# Composition

## Wrapping components

If you wrap a component, verify if that component has a static property `muiName` set.

```tsx
const WrappedIcon = (props) => <Icon {...props} />;
WrappedIcon.muiName = Icon.muiName;
```


## `component` prop

Material UI allows you to change the root element that will be rendered via a prop called `component`.

For example, by default a `List` component will render a `<ul>` element. The following example will render the List component with a `<nav>` element as root element instead:

```tsx
<List component="nav">
  <ListItem button>
    <ListItemText primary="Trash" />
  </ListItem>
  <ListItem button>
    <ListItemText primary="Spam" />
  </ListItem>
</List>
```

If you use an inline function as an argument for the `component` prop, wrap it in `useMemo`:

```tsx
import { Link, LinkProps } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
        linkProps,
        ref,
      ) {
        return <Link ref={ref} to={to} {...linkProps} />;
      }),
    [to],
  );

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
```

### Add `component` prop to your custom component

To be able to use the `component` prop, the type of the props should be used with type arguments.

```tsx
import { TypographyProps } from '@mui/material/Typography';

function CustomComponent(props: TypographyProps<'a', { component: 'a' }>) {
  /* ... */
}
// ...
<CustomComponent component="a" />;
```

It's also possible to have a generic `CustomComponent` which will accept any React component, and HTML elements to `component` prop.

```tsx
function GenericCustomComponent<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }>,
) {
  /* ... */
}
```