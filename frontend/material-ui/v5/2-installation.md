# Installation

```bash
yarn add @mui/material @emotion/react @emotion/styled
```

## Install Roboto font

Add the following code snippet inside your project's `<head />` tag:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

## Icons

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

## Responsive meta tag

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```


## CssBaseline

Material UI provides an optional `<CssBaseline />` component.

It fixes some inconsistencies across browsers and devices, providing resets like `normalize.css`.


## Adding MUI to your project

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
</head>
```


```jsx
// main.jsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
```

```jsx
// App.jsx
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

export default function App() {
  const theme = useTheme();
  return (
    <div>
      <Button variant="contained">Hello World</Button>
      <span>{`spacing ${theme.spacing}`}</span>
    </div>
  );
}
```


## Examples

- [Material UI - Vite.js](https://github.com/mui/material-ui/tree/master/examples/material-vite/)



## Templates

https://mui.com/material-ui/getting-started/templates/

Includes:

- Dashboard, Admin layout
- Sign-in, sign-up
- Blog
- Checkout