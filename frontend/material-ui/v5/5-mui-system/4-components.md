# Layout Components

## Box

The Box component serves as a wrapper component for most of the CSS utility needs.

### The `sx` prop

```tsx
import { Box, ThemeProvider } from '@mui/system';

export default function BoxSx() {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
            dark: '#0059B2',
          },
        },
      }}
    >
      <Box
        sx={{
          width: 300,
          height: 300,
          bgcolor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
    </ThemeProvider>
  );
}
```

### Rendering custom element

```tsx
<Box
  component="img"
  sx={{
    height: 233,
    width: 350,
    maxHeight: { xs: 233, md: 167 },
    maxWidth: { xs: 350, md: 250 },
  }}
  alt="The house from the offer."
  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
/>
```

### System props

The Box also supports all system properties

```tsx
<Box mt={2}>
```

### Create your own Box component

If you want to have a different default theme for the Box component, you can create your own version of it.

```tsx
import { createBox, createTheme } from '@mui/system';

const defaultTheme = createTheme({
  // your custom theme values
});

const Box = createBox({ defaultTheme });

export default Box;
```

## Container

The container centers your content horizontally.

### Fluid

A fluid container width is bounded by the maxWidth prop value.

```tsx
<Container maxWidth="sm">
```

### Fixed

```tsx
<Container fixed>
```


## Grid

The Grid component works well for a layout with known columns.

The columns can be configured in multiple breakpoints which you have to specify the column span of each child.

### Basic Grid

Use `container` prop to create a grid container that wraps the grid items.

Column widths are integer values between 1 and 12; they apply at any breakpoint and indicate how many columns are occupied by the component.

A value given to a breakpoint applies to all the other breakpoints wider than it. For example, `xs={12}` sizes a component to occupy the whole viewport width regardless of its size.

```tsx
<Grid container spacing={2}>
  <Grid xs={6} md={8}>
    xs=6 md=8
  </Grid>
  <Grid xs={6} md={4}>
    xs=6 md=4
  </Grid>
  <Grid xs={6} md={4}>
    xs=6 md=4
  </Grid>
  <Grid xs={6} md={8}>
    xs=6 md=8
  </Grid>
</Grid>
```

### Spacing

To control space between children, use the `spacing` prop. The spacing value can be any positive number, including decimals and any string. 

The prop is converted into a CSS property using the `theme.spacing()` helper.

```tsx
<Grid container spacing={2}>
```

The `rowSpacing` and `columnSpacing` props allow for specifying the row and column gaps independently.

```tsx
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid xs={6}>1</Grid>
  <Grid xs={6}>2</Grid>
  <Grid xs={6}>3</Grid>
  <Grid xs={6}>4</Grid>
</Grid>
```

### Responsive values

```tsx
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {Array.from(Array(6)).map((_, index) => (
    <Grid xs={2} sm={4} key={index}>
      {index + 1}
    </Grid>
  ))}
</Grid>
```

Responsive values is supported by:

- `columns`
- `columnSpacing`
- `direction`
- `rowSpacing`
- `spacing`
- all the other props of the system

### Auto-layout

Makes the items equitably share the available space:

```tsx
<Grid container spacing={3}>
  <Grid xs>
    xs
  </Grid>
  <Grid xs={6}>
    xs=6
  </Grid>
  <Grid xs>
    xs
  </Grid>
</Grid>
```

Size a column based on the natural width of its content:

```tsx
<Grid container spacing={3}>
  <Grid xs="auto">
    Variable width item
  </Grid>
  <Grid xs={6}>
    xs=6
  </Grid>
  <Grid xs>
    xs
  </Grid>
</Grid>
```

### Nested Grid

Nested grid inherits the columns and spacing from the upper grid if it receive those props

```tsx
<Grid container spacing={2}>
  <Grid xs={12} md={5} lg={4}>
    Email subscribe section
  </Grid>
  <Grid container xs={12} md={7} lg={8} spacing={4}>
    <Grid xs={6} lg={3}>
      A
    </Grid>
    <Grid xs={6} lg={3}>
      B
    </Grid>
  </Grid>
</Grid>
```

### Columns

You can change the default number of columns (12) with the `columns` prop.

```tsx
<Grid container spacing={2} columns={16}>
  <Grid xs={8}>
    <Item>xs=8</Item>
  </Grid>
  <Grid xs={8}>
    <Item>xs=8</Item>
  </Grid>
</Grid>
```

### Offset

Move the item to the right

- number, `mdOffset={2}` - when used the item is moved to the right by 2 columns starts from md breakpoint and up.
- `"auto"` - when used, the item is moved to the right edge of the grid container.

```tsx
<Grid container spacing={3} sx={{ flexGrow: 1 }}>
  <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
    <Item>1</Item>
  </Grid>
  <Grid xs={4} md={2} mdOffset="auto">
    <Item>2</Item>
  </Grid>
  <Grid xs={4} xsOffset={4} md={2} mdOffset={0}>
    <Item>3</Item>
  </Grid>
  <Grid xs md={6} mdOffset={2}>
    <Item>4</Item>
  </Grid>
</Grid>
```

### Custom breakpoints

If you specify custom breakpoints to the theme, you can use those names as grid item props in responsive values

```tsx
<Grid mobile={6} mobileOffset={2}>me
```


## Stack

Stack is a container component for arranging elements vertically or horizontally.

Stack is ideal for one-dimensional layouts, while Grid is preferable when you need both vertical and horizontal arrangement.

```tsx
import Stack from '@mui/material/Stack';

<Stack spacing={2}>
  <Item>Item 1</Item>
  <Item>Item 2</Item>
  <Item>Item 3</Item>
</Stack>
```

### Direction

Position items horizontally in a row:

```tsx
<Stack direction="row" spacing={2}>
  <Item>Item 1</Item>
  <Item>Item 2</Item>
  <Item>Item 3</Item>
</Stack>
```

### Dividers

```tsx
<Stack
  direction="row"
  divider={
    <Box
      component="hr"
      sx={{
        border: (theme) =>
          `1px solid ${theme.palette.mode === 'dark' ? '#262B32' : '#fff'}`,
      }}
    />
  }
  spacing={2}
>
  <Item>Item 1</Item>
  <Item>Item 2</Item>
  <Item>Item 3</Item>
</Stack>
```

### Responsive values

```tsx
<Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }}
>
  <Item>Item 1</Item>
  <Item>Item 2</Item>
  <Item>Item 3</Item>
</Stack>
```

### Flexbox gap

```tsx
<Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
  <Item>Item 1</Item>
  <Item>Item 2</Item>
  <Item>Long content</Item>
</Stack>
```