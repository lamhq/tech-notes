# Color

## Picking colors

Use [Color Tool](https://material.io/resources/color/) to create color palette for your UI,

## Playground

Test your primary and secondary color [here](https://material-ui.com/customization/color/#playground)

```ts
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});
```

Only the `main` shades need be provided (unless you wish to further customize `light`, `dark` or `contrastText`), as the other colors will be calculated by `createMuiTheme()`

## Theme Tools

- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/)


## 2014 Material Design color palettes

View the color palette [here](https://material-ui.com/customization/color/#2014-material-design-color-palettes)

```ts
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #f44336
const accent = purple['A200']; // #e040fb
const accent = purple.A200; // #e040fb (alternative method)
```