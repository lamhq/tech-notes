# Typography

```tsx
<Typography variant="h3">Responsive h3</Typography>
```

## Font family

You can change the font family with the `theme.typography.fontFamily` property

```ts
const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
```


## Font size

### rem unit

Material UI uses `rem` units for the font size.

`rem` stands for “root em”, a unit of measurement that represents the font size of the root element.

`1rem` equals the font size of the `html` element. most browsers has a default value of `16px`

Using rem can help ensure consistency of font size and spacing throughout your UI.

To change the font-size of Material UI you can provide a `fontSize` property. The default value is `14px`.

```ts
const theme = createTheme({
  typography: {
    fontSize: 12,
  },
});
```

### Responsive font sizes

```ts
const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
```

Or you can automate this with `responsiveFontSizes()` helper.

```ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```


### HTML font size

You might want to change the `<html>` element default font size

```ts
const theme = createTheme({
  typography: {
    // Tell Material UI what the font-size on the html element is.
    htmlFontSize: 10, // 10px
  },
});
```

## Variants

The typography object comes with 13 variants by default:

- h1
- h2
- h3
- h4
- h5
- h6
- subtitle1
- subtitle2
- body1
- body2
- button
- caption
- overline

Each of these variants can be customized individually:

```ts
const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});
```

### Adding & disabling variants

https://mui.com/material-ui/customization/typography/#adding-amp-disabling-variants