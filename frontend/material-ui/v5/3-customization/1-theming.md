# Theming

## ThemeProvider

```ts
import * as React from 'react';
import ReactDOM from 'react-dom';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function App() {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}
```


## Theme configuration variables

- `.palette`
- `.typography`
- `.spacing`
- `.breakpoints`
- `.zIndex`
- `.transitions`
- `.components`

You can check out the [default theme section](https://mui.com/customization/default-theme/) to view the default theme in full.

### Custom variables

```ts
const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
```

If you are using TypeScript, you would also need to use module augmentation for the theme to accept the above values.

```ts
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
```


## Theme builder

- [mui-theme-creator](https://bareynol.github.io/mui-theme-creator/): A tool to help design and customize themes for the MUI component library. Includes basic site templates to show various components and how they are affected by the theme
