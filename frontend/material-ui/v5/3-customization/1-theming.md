# Theming

## Enable theming

Check [Adding MUI to your project](../2-installation.md#adding-mui-to-your-project)


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

It can be convenient to add additional variables to the theme so you can use them everywhere

```ts
const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
```

If you are using TypeScript, You have to use [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) to add new variables to the `Theme` and `ThemeOptions`

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


## Tools

- [mui-theme-creator](https://zenoo.github.io/mui-theme-creator/): A tool to help design and customize theme.
- [Material palette generator](https://m2.material.io/inline-tools/color/): generate a palette for any color you input.


## Accessing the theme in a component

```tsx
import { useTheme } from '@material-ui/core/styles';

function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
```


## Nesting the theme

```jsx
<ThemeProvider theme={outerTheme}>
  <Checkbox defaultChecked />
  <ThemeProvider theme={innerTheme}>
    <Checkbox defaultChecked />
  </ThemeProvider>
</ThemeProvider>
```


## Theme default values

You can explore the default values of the typography using the [theme explorer](https://mui.com/material-ui/customization/default-theme/?expand-path=$.typography) or by opening the dev tools console on this page (`window.theme.typography`).