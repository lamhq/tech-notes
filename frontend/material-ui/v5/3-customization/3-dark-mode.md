# Dark mode

Material UI comes with two palette modes: light (the default) and dark.


## Dark mode by default

Adding `mode: 'dark'` to the createTheme helper:

```tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>This app is using the dark mode</main>
    </ThemeProvider>
  );
}

export default App;
```

## Dark mode with a custom palette

To use custom palettes for light and dark modes, you can create a function that will return the correct palette depending on the selected mode

```tsx
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});
```

```tsx
const mode = 'light';
const theme = createTheme(getDesignTokens(mode));

return (
  <ThemeProvider theme={theme}>
    <Page />
  </ThemeProvider>
);
```


## Toggling dark mode

```jsx
const mode = 'light';
const theme = createTheme({
  palette: {
    mode,
  },
});

return (
  <ThemeProvider theme={theme}>
    <MyApp />
  </ThemeProvider>
);
```

## System preference

Users might have a preference for light or dark mode that they've set through their operating system.

You can make use of this preference with the `useMediaQuery` hook:

```jsx
const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
const mode = prefersDarkMode ? 'dark' : 'light';
const theme = createTheme({
  palette: {
    mode,
  },
});

return (
  <ThemeProvider theme={theme}>
    <MyApp />
  </ThemeProvider>
);
```
