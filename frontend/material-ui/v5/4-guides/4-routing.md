
## Routing libraries

### Navigation components

```tsx
import Link from '@mui/material/Link';

<Link href="/">Link</Link>
```

```tsx
import Button from '@mui/material/Button';

<Button href="/" variant="contained">
  Link
</Button>
```

## Global theme Link

This demo set default `component` prop value to use React Router `Link` component for all `MuiLink` components.

```tsx
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});
```

## `component` prop

### Link

```tsx
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

<Link component={RouterLink} to="/">
```

```tsx
import Link from '@mui/material/Link';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
  (props, ref) => (
    <RouterLink
      ref={ref}
      to="/material-ui/getting-started/installation/"
      {...props}
    />
  ),
);

<Link component={LinkBehavior}>Without prop forwarding</Link>
```

### Button

```tsx
<Router>
  <Button component={RouterLink} to="/">
    With prop forwarding
  </Button>
  <br />
  <Button component={LinkBehavior}>With inlining</Button>
</Router>
```

### Tab

https://mui.com/material-ui/guides/routing/#tabs


### List

https://mui.com/material-ui/guides/routing/#list


### Next.js

https://mui.com/material-ui/guides/routing/#next-js