# Getting Started

## Version

This document is for version: `v5.11.6`


## Requirements

- react >= 17.0.0 
- react-dom >= 17.0.0


## Installation

```bash
yarn add @mui/material @emotion/react @emotion/styled
```

### Adding Roboto Font

Material UI uses the Roboto font by default.

Add the following code snippet inside your project's `<head />` tag:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

### Icons

```bash
yarn add @mui/icons-material
```

### Responsive meta tag

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```


## Usage

```jsx
import * as React from 'react';
import Button from '@mui/material/Button';

export default function MyApp() {
  return (
    <div>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}
```

## Templates

- [Sign In](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in)
- [Sign Up](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up)
- [Checkout Form](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/checkout)
- [Blog](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/blog)