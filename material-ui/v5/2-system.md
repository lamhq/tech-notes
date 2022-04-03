# MUI System

## Installation

```sh
yarn add @mui/system @emotion/react @emotion/styled
```

## The `sx` prop

The `sx` prop is a shortcut for defining custom style that has access to the theme. The `sx` prop can be used in four different locations:

1. Core components. All core MUI components will support the `sx` prop.
2. `Box` component. `Box` is a lightweight component that gives access to the `sx` prop, and can be used as a utility component, and as a wrapper for other components. It renders a `<div>` element by default.
3. Custom components. In addition to MUI components, you can add the `sx` prop to your custom components too, by using the styled utility from `@mui/material/styles`.

```jsx
import { styled } from '@mui/material/styles';

const Div = styled('div')``;
```


### System properties

As a CSS utility component, the Box also supports all [system properties](https://mui.com/system/properties/). You can use them as prop directly on the component.

```jsx
<Button sx={{ mb: 3 }}>
// or
<Box mb={3}>
// or
<Box marginBottom={3}>

<Button sx={{ mb: 3 }} />
// is equivalent to
<Button sx={{ marginBottom: theme => theme.spacing(3)}} />
```

Only the `Box`, `Stack`, `Typography`, and `Grid` components accept the system properties as *props*.

### Theme aware properties

#### Borders

```jsx
<Box sx={{ border: 1 }} />
// equivalent to border: '1px solid black'

<Box sx={{ borderTop: 0 }} />
// subtract border top

<Box sx={{ borderColor: 'primary.main' }} />
// equivalent to borderColor: theme => theme.palette.primary.main

<Box sx={{ borderRadius: 2 }} />
// equivalent to borderRadius: theme => 2 * theme.shape.borderRadius
```

#### Grid

```jsx
<Box sx={{ gap: 2 }} />
// equivalent to gap: theme => theme.spacing(2)
```

#### Palette

The `color` and `backgroundColor` properties can receive a string, which represents the path in the `theme.palette`

```jsx
<Box sx={{ color: 'primary.main' }} />
// equivalent to color: theme => theme.palette.primary.main

<Box sx={{ bgcolor: 'primary.main' }} />
// equivalent to backgroundColor: theme => theme.palette.primary.main
```

#### Positions

```jsx
<Box sx={{ zIndex: 'tooltip' }} />
// equivalent to zIndex: theme => theme.zIndex.tooltip
```

#### Shadows

The `boxShadow` property maps its value to the `theme.shadows` value.

```jsx
<Box sx={{ boxShadow: 1 }} />
// equivalent to boxShadow: theme => theme.shadows[1]
```

#### Sizing

Sizing properties: `width`, `height`, `minHeight`, `maxHeight`, `minWidth` and `maxWidth`

If the value is between [0, 1], it's converted to percent. Otherwise, it is directly set on the CSS property.

```jsx
<Box sx={{ width: 1/2 }} /> // equivalent to width: '50%'
<Box sx={{ width: 20 }} /> // equivalent to width: '20px'
```

#### Spacing

Spacing properties: `margin`, `padding`. Aliases: `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`

```jsx
<Box sx={{ margin: 2 }} />
// equivalent to margin: theme => theme.spacing(2)
```

#### Typography

The `fontFamily`, `fontSize`, `fontStyle`, `fontWeight` properties map their value to the `theme.typography` value:

```jsx
<Box sx={{ fontWeight: 'fontWeightLight' }} />
// equivalent to fontWeight: theme.typography.fontWeightLight

<Box sx={{ fontWeight: 'light' }} />
// equivalent to fontWeight: theme.typography.fontWeightLight

<Box sx={{ typography: 'body1' }} />
// equivalent to { ...theme.typography.body1 }
```


### Shorthands

```jsx
<Box
  sx={{
    boxShadow: 1, // theme.shadows[1]
    color: 'primary.main', // theme.palette.primary.main
    m: 1, // margin: theme.spacing(1)
    p: {
      xs: 1, // [theme.breakpoints.up('xs')]: { padding: theme.spacing(1) }
    },
    zIndex: 'tooltip', // theme.zIndex.tooltip
  }}
>
```

### Pseudo selectors

```jsx
<Box
  sx={{
    // some styles
    ":hover": {
      boxShadow: 6,
    },
  }}
>
```

### Media queries

```jsx
<Box
  sx={{
    // some styles
    '@media print': {
      width: 300,
    },
  }}
>
```

### Nested selector

```jsx
<Box
  sx={{
    // some styles
    '& .ChildSelector': {
      bgcolor: 'primary.main',
    },
  }}
>
```

### Responsive values

```jsx
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

<Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
  }}
/>
```


### Custom (responsive) breakpoints

```jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

export default function CustomBreakpoints() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: {
            mobile: 100,
            laptop: 300,
          },
        }}
      >
        This box has a responsive width
      </Box>
    </ThemeProvider>
  );
}
```

If you are using TypeScript, you will also need to use module augmentation for the theme to accept the above values.

```jsx
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}
```

### Accessing Theme object

```jsx
<Box
  sx={{
    p: 1,
    border: 1,
    borderColor: (theme: Theme) => theme.palette.primary.main,
  }}
>
  Border color with theme value.
</Box>

<Box
  sx={(theme) => ({
    ...theme.typography.body,
    color: theme.palette.primary.main,
  })}
/>
```


### Array values

Array type is useful when you want to partially override some styles in the former index:

```jsx
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
    (theme) => ({
      '&:hover': {
        color: theme.palette.primary.main,
      },
    }),
  ]}
/>
```

### Hiding elements

| Screen Size        | Class                                                        |
| :----------------- | :----------------------------------------------------------- |
| Hidden on all      | `sx={{ display: 'none' }}`                                   |
| Hidden only on xs  | `sx={{ display: { xs: 'none', sm: 'block' } }}`              |
| Hidden only on sm  | `sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}` |
| Hidden only on md  | `sx={{ display: { xs: 'block', md: 'none', lg: 'block' } }}` |
| Hidden only on lg  | `sx={{ display: { xs: 'block', lg: 'none', xl: 'block' } }}` |
| Hidden only on xl  | `sx={{ display: { xs: 'block', xl: 'none' } }}`              |
| Visible only on xs | `sx={{ display: { xs: 'block', sm: 'none' } }}`              |
| Visible only on sm | `sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}`  |
| Visible only on md | `sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}`  |
| Visible only on lg | `sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}`  |
| Visible only on xl | `sx={{ display: { xs: 'none', xl: 'block' } }}`              |


### Overriding MUI components

The `Box` component wraps your component. It creates a new DOM element, a `<div>` by default that can be changed with the `component` prop. 


```jsx
import * as React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';

export default function BoxComponent() {
  return (
    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
      <Button>Save</Button>
    </Box>
  );
}
```


### Passing `sx` prop

If you want to receive sx prop from your component and pass it down to MUI's component, we recommend this approach:

```jsx
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import FormLabel from '@mui/material/FormLabel';
import { SxProps, Theme } from '@mui/material/styles';

interface ListHeaderProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const ListHeader = ({ sx = [], children }: ListHeaderProps) => (
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

export default function PassingSxProp() {
  return (
    <ListHeader
      sx={(theme) => ({
        color: 'info.main',
        ...theme.typography.overline,
      })}
    >
      Header
    </ListHeader>
  );
}
```

### Adding the `sx` prop to your custom components

```tsx
import * as React from 'react';
import styled, { InterpolationFunction, ThemeProvider } from 'styled-components';
import { unstable_styleFunctionSx, SxProps } from '@mui/system';
import NoSsr from '@mui/base/NoSsr';
import { createTheme } from '@mui/material/styles';

interface DivProps {
  sx?: SxProps;
}

const theme = createTheme();

const Div = styled('div')<DivProps>(
  unstable_styleFunctionSx as InterpolationFunction<DivProps>,
);

export default function StyleFunctionSxDemo() {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Div sx={{ m: 1, p: 1, border: 1 }}>Custom component using the system</Div>
      </ThemeProvider>
    </NoSsr>
  );
}
```

### Add system properties to your component

```tsx
import * as React from 'react';
import styled from 'styled-components';
import { palette, PaletteProps, spacing, SpacingProps } from '@mui/system';
import NoSsr from '@mui/base/NoSsr';

const Div = styled.div<PaletteProps & SpacingProps>`
  ${palette}
  ${spacing}
`;

export default function CombiningStyleFunctionsDemo() {
  return (
    <NoSsr>
      <Div color="white" bgcolor="palevioletred" p={1}>
        Styled components
      </Div>
    </NoSsr>
  );
}
```


### Create your own `Box` component

```jsx
import { createBox, createTheme } from '@mui/system';

const defaultTheme = createTheme({
  // your custom theme values
});

const Box = createBox({ defaultTheme });

export default Box;
```


## `styled()`

All the MUI components are styled with this `styled()` utility. This utility is built on top of the `styled()` module of` @mui/styled-engine` and provides additional features.

It uses MUI's default `theme` if no theme is available in React context.

It adds support for the the `sx` prop

Check out the API [here](https://mui.com/system/styled/#api)


### Basic usage

```jsx
import * as React from 'react';
import { styled } from '@mui/system';

const MyComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
});

export default function BasicUsage() {
  return <MyComponent>Styled div</MyComponent>;
}
```


### Using the theme

```jsx
const MyThemeComponent = styled('div')(({ theme }) => ({
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


### Custom components

```jsx
import * as React from 'react';
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


### Difference with the `sx` prop

#### `sx` provides more shortcuts than `styled`

```jsx
const MyStyledButton = styled('button')({
  mx: 1, // ❌ don't use this! This shortcut is only provided by the `sx` prop
});

const MyStyledButton = (props) => (
  <button sx={{
    mx: 1, // ✔️ this shortcut is specific to the `sx` prop,
  }}>
     {props.children}
  </button>
})
```

#### The style definition varies slightly

```jsx
const MyStyledButton = styled('button')({
  padding: 1, // means "1px", NOT "theme.spacing(1)"
});

const MyStyledButton = (props) => (
  <button sx={{
    padding: 1 // means "theme.spacing(1)", NOT "1px"
  }}>
     {props.children}
  </button>
})
```


### How can I use the `sx` syntax with the `styled()` utility?

```jsx
import * as React from 'react';
import {
  styled,
  createTheme,
  ThemeProvider,
  experimental_sx as sx,
} from '@mui/system';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: 'white',
    },
  },
});

const MyThemeComponent = styled('div')(
  sx({
    color: 'primary.contrastText',
    backgroundColor: 'primary.main',
    padding: 1,
    borderRadius: 1,
  }),
);

export default function ThemeUsage() {
  return (
    <ThemeProvider theme={customTheme}>
      <MyThemeComponent>Styled div with theme</MyThemeComponent>
    </ThemeProvider>
  );
}
```
