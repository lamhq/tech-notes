# Getting Started

## Installation

```bash
yarn add @material-ui/core
```

### Adding Font & CSS, Meta Tag

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
>
```

### Adding SVG Icons

```bash
yarn add @material-ui/icons
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

