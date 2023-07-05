# z-index

You can customize z-index of material ui components in theme.

Customization of individual values is discouraged; should you change one, you likely need to change them all.

```tsx
const theme = createTheme({
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  }
});
```