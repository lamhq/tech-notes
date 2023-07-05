# Spacing

```ts
const theme = createTheme();

theme.spacing(2); // `${8 * 2}px` = '16px'
```

## Custom spacing

You can change the spacing transformation:

```ts
const theme = createTheme({
  spacing: 4,
});

theme.spacing(2); // `${4 * 2}px` = '8px'
```

```ts
const theme = createTheme({
  spacing: (factor) => `${0.25 * factor}rem`, // (Bootstrap strategy)
});

theme.spacing(2); // = 0.25 * 2rem = 0.5rem = 8px
```

```ts
const theme = createTheme({
  spacing: [0, 4, 8, 16, 32, 64],
});

theme.spacing(2); // = '8px'
```


## Reduce the boilerplate

```ts
padding: theme.spacing(1, 2), // '8px 16px'
```

```ts
margin: theme.spacing(1, 'auto'), // '8px auto'
```