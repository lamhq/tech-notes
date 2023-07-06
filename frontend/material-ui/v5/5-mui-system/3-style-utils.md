# Style Utilities

## Properties

Only the `Box`, `Stack`, `Typography`, and `Grid` components accept the system properties as props

```tsx
<Button sx={{ mb: 3 }}>
// or
<Box mb={3}>
// or
<Box marginBottom={3}>
```

Check [Properties reference table](https://mui.com/system/properties/#properties-reference-table).


## Border

```tsx
// Additive
<Box sx={{ border: 1 }}>...</Box>
<Box sx={{ borderTop: 1 }}>...</Box>

// subtractive
<Box sx={{ border: 0 }}>...</Box>
<Box sx={{ borderTop: 0 }}>...</Box>
```

## Hiding elements

Hidden only on xs:

```tsx
sx={{ display: { xs: 'none', sm: 'block' } }}
```

See more at https://mui.com/system/display/#hiding-elements


## Color

```tsx
<Box sx={{ color: 'primary.main' }}>…
<Box sx={{ color: 'secondary.main' }}>…
<Box sx={{ color: 'error.main' }}>…
<Box sx={{ color: 'warning.main' }}>…
<Box sx={{ color: 'info.main' }}>…
<Box sx={{ color: 'success.main' }}>…
<Box sx={{ color: 'text.primary' }}>…
<Box sx={{ color: 'text.secondary' }}>…
<Box sx={{ color: 'text.disabled' }}>…
```


## Sizing

The sizing properties: `width`, `height`, `minHeight`, `maxHeight`, `minWidth`, and `maxWidth`

If the value is between [0, 1], it's converted to percent. Otherwise, it is directly set on the CSS property.

```tsx
<Box sx={{ width: 1/4 }}> // Equivalent to width: '25%'
<Box sx={{ width: 300 }}> // Numbers are converted to pixel values.
<Box sx={{ width: '75%' }}> // String values are used as raw CSS.
<Box sx={{ width: 1 }}> // 100%
```


## Spacing

Depending on the input and the theme configuration, the following transformation is applied:

### input: `number` & theme: `number`

the prop value is multiplied by the theme value.

```tsx
const theme = {
  spacing: 8,
}

<Box sx={{ m: -2 }} /> // margin: -16px;
<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 0.5 }} /> // margin: 4px;
<Box sx={{ m: 2 }} /> // margin: 16px;
```

### input: `number` & theme: `array`

the prop value is used as the array index.
```tsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box sx={{ m: -2 }} /> // margin: -3px;
<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 2 }} /> // margin: 3px;
```

### input: `number` & theme: `function`

the function is called with the prop value.
```tsx
const theme = {
  spacing: value => value * 2,
}

<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 2 }} /> // margin: 4px;
```

### input: `string`

the prop value is passed as raw CSS value.

```tsx
<Box sx={{ m: '2rem' }} /> // margin: 2rem;
<Box sx={{ mx: 'auto' }} /> // margin-left: auto; margin-right: auto;
```


## Screen readers

To hide an element visually but make it available for screen readers

```tsx
import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

export default function VisuallyHiddenUsage() {
  return (
    <Link href="#foo">
      Read more
      {/* always visually hidden because the parent is focusable element */}
      <Box sx={visuallyHidden}>about how to visually hide elements</Box>
    </Link>
  );
}
```

```tsx
import { visuallyHidden } from '@mui/utils';

<div style={visuallyHidden}>about how to visually hide elements</div>;
```

## Typography

### Variant

```tsx
<Box sx={{ typography: 'subtitle2' }}>… // theme.typography.subtitle2
<Box sx={{ typography: 'body1' }}>…
<Box sx={{ typography: 'body2' }}>…
```

## `styled()`

Utility for creating styled components.

The utility can be used as a replacement for `styled()` utility of `emotion` or `styled-components`

Additional benefits:
- uses MUI's default theme if no theme is available
- supports the theme's styleOverrides and variants
- support for the the sx prop
- add the `shouldForwardProp` option

### API

```tsx
styled(Component, [options])(styles) => Component
```

https://mui.com/system/styled/#api

### Basic usage

```tsx
import { styled } from '@mui/system';

const MyComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
});

export default function App() {
  return <MyComponent>Styled div</MyComponent>;
}
```

### Using theme

The function (which return a style object) receives the theme and component's props in an object which is its single argument.

```tsx
import { styled } from '@mui/system';

const MyThemeComponent = styled('div')(({ theme, ...props }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

export default function ThemeUsage() {
  return (
    <MyThemeComponent>Styled div with theme</MyThemeComponent>
  );
}
```

### Create custom component

This example demonstrates how you can use the `styled` API to create custom components, with the same capabilities as the core components:

```tsx
import { styled, createTheme, ThemeProvider } from '@mui/system';

interface MyThemeComponentProps {
  color?: 'primary' | 'secondary';
  variant?: 'normal' | 'dashed';
}

const customTheme = createTheme({
  components: {
    MyThemeComponent: {
      styleOverrides: {
        root: {
          color: 'darkslategray',
        },
        primary: {
          color: 'darkblue',
        },
        secondary: {
          color: 'darkred',
          backgroundColor: 'pink',
        },
      },
      variants: [
        {
          props: { variant: 'dashed', color: 'primary' },
          style: {
            border: '1px dashed darkblue',
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: '1px dashed darkred',
          },
        },
      ],
    },
  },
});

const MyThemeComponent = styled('div', {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== 'color' && prop !== 'variant' && prop !== 'sx',
  name: 'MyThemeComponent',
  slot: 'Root',
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === 'primary' && styles.primary,
    props.color === 'secondary' && styles.secondary,
  ],
})<MyThemeComponentProps>(({ theme }) => ({
  backgroundColor: 'aliceblue',
  padding: theme.spacing(1),
}));

export default function UsingOptions() {
  return (
    <ThemeProvider theme={customTheme}>
      <MyThemeComponent sx={{ m: 1 }} color="primary" variant="dashed">
        Primary
      </MyThemeComponent>
      <MyThemeComponent sx={{ m: 1 }} color="secondary">
        Secondary
      </MyThemeComponent>
    </ThemeProvider>
  );
}
```

### Create custom `styled()` utility

If you want to have a different default theme for the `styled()` utility, you can create your own version of it, using the `createStyled()` utility.

```tsx
import { createStyled, createTheme } from '@mui/system';

const defaultTheme = createTheme({
  // your custom theme values
});

const styled = createStyled({ defaultTheme });

export default styled;
```

### Difference with the `sx` prop

- Shorthand props only apply to `sx` prop
  ```tsx
  const MyStyledButton = styled('button')({
    mx: 1, // ❌ don't use this! This shortcut is only provided by the `sx` prop
  });
  ```
- Spacing unit is different
  ```tsx
  const MyStyledButton = styled('button')({
    padding: 1, // means "1px", NOT "theme.spacing(1)"
  });
  ```