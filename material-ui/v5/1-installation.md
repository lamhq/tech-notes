# Installation

## npm

```sh
yarn add @mui/material @emotion/react @emotion/styled
```

## Font

MUI was designed with the Roboto font. The Roboto font will not be automatically loaded by MUI. You are responsible for loading any fonts used in your application.

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```


## Font icons

To use the font Icon component, you must first add the Material icons font

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```


## SVG icons

```sh
yarn add @mui/icons-material
```


## Responsive meta tag

MUI is developed mobile-first. To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element.

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```


## Quick start

```ts
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```
