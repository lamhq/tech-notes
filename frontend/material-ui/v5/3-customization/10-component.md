# Components

The theme's `components` key allows you to customize a component without wrapping it in another component. You can change the styles, the default props, and more.

## Component default props

```tsx
const theme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});
```


## Style overrides

This is useful if you want to apply a fully custom design system to Material UI's components. It can be specified in `styleOverrides` key:

```tsx
const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  },
});
```

### Overrides based on props

You can pass a callback as a value in each slot of the component's `styleOverrides` to apply styles based on props.

The `ownerState` prop is a combination of public props that you pass to the component + internal state of the component.

```tsx
const finalTheme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        valueLabel: ({ ownerState, theme }) => ({
          ...(ownerState.orientation === 'vertical' && {
            backgroundColor: 'transparent',
            color: theme.palette.grey[500],
          }),
        }),
      },
    },
  },
});
```

### Use `sx` prop

You can use the `sx` prop to override component's style.


## Creating new component variants

New variants can specify what styles the component should have when that specific variant prop value is applied.

```ts
const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed ${blue[500]}`,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],
    },
  },
});
```

```tsx
<ThemeProvider theme={theme}>
  <Button variant="dashed" sx={{ m: 1 }}>
    Dashed
  </Button>
  <Button variant="dashed" color="secondary" sx={{ m: 1 }}>
    Secondary
  </Button>
  <Button variant="dashed" size="large" sx={{ m: 1 }}>
    Large
  </Button>
  <Button variant="dashed" color="secondary" size="large" sx={{ m: 1 }}>
    Secondary large
  </Button>
</ThemeProvider>
```

If you're using TypeScript, you'll need to specify your new variants/colors, using module augmentation.

```ts
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```


## Theme variables

Another way to override the look of all component instances is to adjust the theme configuration variables.

```tsx
const theme = createTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});

<ThemeProvider theme={theme}>
  <Button>font-size: 1rem</Button>
</ThemeProvider>
```