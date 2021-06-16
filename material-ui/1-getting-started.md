# Getting Started

## Installation

```bash
yarn add @material-ui/core
```

### Adding Roboto Font

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

### Adding SVG Icons

```bash
yarn add @material-ui/icons
```

### Adding Responsive meta tag

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width"
/>
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Templates

- [Sign In](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in)
- [Sign Up](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up)
- [Checkout Form](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/checkout)
- [Blog](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/blog)