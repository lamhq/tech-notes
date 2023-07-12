# How to use `sx` prop?

## CSS properties

Support:
- `border`, `borderColor`
- `displayPrint`
- `gap`, `rowGap`, `columnGap`
- `color`, `backgroundColor`, `bgcolor`
- `zIndex`
- `boxShadow`
- `width`, `height`, `minHeight`, `maxHeight`, `minWidth`, and `maxWidth`
- `m`, `mt`, `mb`, `mx`, `my`, `p`, `pt`, `px`, `py`,...
- `fontFamily`, `fontSize`, `fontStyle`, `fontWeight`

The `color` property can receive a string, which represents the path in `theme.palette`

```tsx
<Box
  sx={{
    boxShadow: 1, // theme.shadows[1]
    color: 'primary.main', // theme.palette.primary.main
    m: 1, // margin: theme.spacing(1)
    p: {
      xs: 1, // [theme.breakpoints.up('xs')]: { padding: theme.spacing(1) }
    },
    zIndex: 'tooltip', // theme.zIndex.tooltip
    fontWeight: 'fontWeightLight',  // theme.typography.fontWeightLight
    typography: 'body1', // theme.typography.body1
  }}
>
```

## Pseudo-selectors

```tsx
<Box
  sx={{
    // some styles
    ":hover": {
      boxShadow: 6,
    },
  }}
>
```

## media queries

```tsx
<Box
  sx={{
    // some styles
    '@media print': {
      width: 300,
    },
  }}
>
```

## nested selector

```tsx
<Box
  sx={{
    // some styles
    '& .ChildSelector': {
      bgcolor: 'primary.main',
    },
  }}
>
```

## responsive values

```tsx
<Box
  sx={{
    width: {
      xs: 100, // theme.breakpoints.up('xs')
      sm: 200, // theme.breakpoints.up('sm')
      md: 300, // theme.breakpoints.up('md')
      lg: 400, // theme.breakpoints.up('lg')
      xl: 500, // theme.breakpoints.up('xl')
    },
  }}
>
  This box has a responsive width.
</Box>
```

## Accessing theme

```tsx
<Box
  sx={{
    p: 1,
    border: 1,
    color: 'text.secondary',
    borderColor: (theme: Theme) => theme.palette.primary.main,
  }}
>
  Border color with theme value.
</Box>
```

```tsx
<Box
  sx={(theme) => ({
    ...theme.typography.body,
    color: theme.palette.primary.main,
  })}
/>
```


## Dynamic style (Array values)

Array types are useful when you want to partially override some styles in the former index:

```tsx
<Box
  sx={[
    {
      '&:hover': {
        color: 'red',
        backgroundColor: 'white',
      },
    },
    foo && {
      '&:hover': { backgroundColor: 'grey' },
    },
    bar && {
      '&:hover': { backgroundColor: 'yellow' },
    },
  ]}
/>
```

- When you hover on this element, `color: red; backgroundColor: white;` is applied.
- If `foo: true,` then `color: red; backgroundColor: grey;` is applied when hovering.
- If `bar: true`, then `color: red; backgroundColor: yellow;` is applied when hovering regardless of foo value, because the higher index of the array has higher specificity.

```tsx
<Box
  sx={[
    { mr: 2, color: 'red' },
    (theme) => ({
      '&:hover': {
        color: theme.palette.primary.main,
      },
    }),
  ]}
/>
```

## Passing the sx prop

If you want to receive the `sx` prop from a custom component and pass it down to an MUI component, we recommend this approach:

```tsx
import ListItem from '@mui/material/ListItem';
import FormLabel from '@mui/material/FormLabel';
import { SxProps, Theme } from '@mui/material/styles';

interface CustomComponentProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

function CustomComponent({ sx = [], children }: CustomComponentProps) {
  return (
    <ListItem
      sx={[
        {
          width: 'auto',
          textDecoration: 'underline',
        },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <FormLabel sx={{ color: 'inherit' }}>{children}</FormLabel>
    </ListItem>
  );
}

export default function App() {
  return (
    <CustomComponent
      sx={(theme) => ({
        color: 'info.main',
        ...theme.typography.overline,
      })}
    >
      Header
    </CustomComponent>
  );
}
```


## Create custom component that use `sx` prop

```tsx
import * as React from 'react';
import styled, { InterpolationFunction, ThemeProvider } from 'styled-components';
import { unstable_styleFunctionSx, SxProps } from '@mui/system';
import { createTheme } from '@mui/material/styles';

interface DivProps {
  sx?: SxProps;
}

const theme = createTheme();

const Div = styled('div')<DivProps>(
  unstable_styleFunctionSx as InterpolationFunction<DivProps>,
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Div sx={{ m: 1, p: 1, border: 1 }}>Custom component with the sx prop</Div>
    </ThemeProvider>
  );
}
```