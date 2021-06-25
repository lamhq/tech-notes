# Spacing

The spacing props are named using the format `{property}{sides}`.

Where `property` is one of:

- `m` - for classes that set margin
- `p` - for classes that set padding

Where `sides` is one of:

- `t` - for classes that set margin-top or padding-top
- `b` - for classes that set margin-bottom or padding-bottom
- `l` - for classes that set margin-left or padding-left
- `r` - for classes that set margin-right or padding-right
- `x` - for classes that set both *-left and *-right
- `y` - for classes that set both *-top and *-bottom

```tsx
const theme = {
  spacing: 8,
}

<Box m={-2} /> // margin: -16px;
<Box m={0} /> // margin: 0px;
<Box m={0.5} /> // margin: 4px;
<Box m={2} /> // margin: 16px;
```

```tsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box m={-2} /> // margin: -3px;
<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 3px;
```

```tsx
const theme = {
  spacing: value => value ** 2,
}

<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 4px;
```