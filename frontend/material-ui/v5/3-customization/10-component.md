# Components

The theme's `components` key allows you to customize a component without wrapping it in another component. You can change the styles, the default props, and more.

## Default props

```tsx
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

export default function DefaultProps() {
  return (
    <ThemeProvider theme={theme}>
      <Button>Change default props</Button>
    </ThemeProvider>
  );
}
```


## Global style overrides

```tsx
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
  },
});

export default function GlobalThemeOverride() {
  return (
    <ThemeProvider theme={theme}>
      <Button>font-size: 1rem</Button>
    </ThemeProvider>
  );
}
```

## Overrides based on props

You can pass a callback as a value in each slot of the component's `styleOverrides` to apply styles based on props.

```tsx
const finalTheme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        valueLabel: ({ ownerState, theme }) => ({
          ...(ownerState.orientation === 'vertical' && {
            backgroundColor: 'transparent',
            color: theme.palette.grey[500],
          }),
        }),
      },
    },
  },
});
```


## Using sx (experimental) syntax in theme's style overrides

```tsx
import * as React from 'react';
import {
  ThemeProvider,
  createTheme,
  experimental_sx as sx,
} from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Check from '@mui/icons-material/Check';

const finalTheme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: sx({
          // https://mui.com/system/the-sx-prop/#spacing
          px: 1,
          py: 0.25,
          // https://mui.com/system/borders/#border-radius
          borderRadius: 1, // 4px as default.
        }),
        label: {
          padding: 'initial',
        },
        icon: sx({
          mr: 0.5,
          ml: '-2px',
        }),
      },
    },
  },
});

export default function GlobalThemeOverride() {
  return (
    <ThemeProvider theme={finalTheme}>
      <Chip
        color="success"
        label={
          <span>
            <b>Status:</b> Completed
          </span>
        }
        icon={<Check fontSize="small" />}
      />
    </ThemeProvider>
  );
}
```

## Adding new component variants

```ts
const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed ${blue[500]}`,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],
    },
  },
});
```

If you're using TypeScript, you'll need to specify your new variants/colors, using module augmentation.

```ts
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```

```tsx
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

const defaultTheme = createTheme();

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed ${defaultTheme.palette.primary.main}`,
            color: defaultTheme.palette.primary.main,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `2px dashed ${defaultTheme.palette.secondary.main}`,
            color: defaultTheme.palette.secondary.main,
          },
        },
        {
          props: { variant: 'dashed', size: 'large' },
          style: {
            borderWidth: 4,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary', size: 'large' },
          style: {
            fontSize: 18,
          },
        },
      ],
    },
  },
});

export default function GlobalThemeVariants() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="dashed" sx={{ m: 1 }}>
        Dashed
      </Button>
      <Button variant="dashed" color="secondary" sx={{ m: 1 }}>
        Secondary
      </Button>
      <Button variant="dashed" size="large" sx={{ m: 1 }}>
        Large
      </Button>
      <Button variant="dashed" color="secondary" size="large" sx={{ m: 1 }}>
        Secondary large
      </Button>
    </ThemeProvider>
  );
}
```


## Theme variables

Another way to override the look of all component instances is to adjust the theme configuration variables.

```tsx
const theme = createTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});

<ThemeProvider theme={theme}>
  <Button>font-size: 1rem</Button>
</ThemeProvider>
```