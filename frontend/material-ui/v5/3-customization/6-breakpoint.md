# Breakpoints

## Default breakpoints

- `xs`, extra-small: 0px
- `sm`, small: 600px
- `md`, medium: 900px
- `lg`, large: 1200px
- `xl`, extra-large: 1536px


## Media Queries helpers

- `theme.breakpoints.up(key)`
- `theme.breakpoints.down(key)`
- `theme.breakpoints.only(key)`
- `theme.breakpoints.not(key)`
- `theme.breakpoints.between(start, end)`

```ts
const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
});
```


## `useMediaQuery` hook

This React hook listens for matches to a CSS media query. It allows the rendering of components based on whether the query matches or not.

```tsx
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
```

```tsx
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

```tsx
import useMediaQuery from '@mui/material/useMediaQuery';

function MyComponent() {
  // you have to inject a theme in a parent theme provider
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

See more at: https://mui.com/material-ui/react-use-media-query/


## Custom breakpoints

If you change the default breakpoints's values, you need to provide them all:

```tsx
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
```

You can add custom breakpoints, or disable existing breakpoints:

```tsx
const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});
```

If you are using TypeScript, you would also need to use module augmentation for the theme to accept the above values:

```tsx
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}
```