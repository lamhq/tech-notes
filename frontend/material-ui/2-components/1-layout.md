# Layout

## Box

The Box component packages [all the style functions](https://material-ui.com/system/basics/#all-inclusive) that are exposed in `@material-ui/system`. It's created using the `styled()` function of `@material-ui/core/styles`.

- borders
- display
- flexbox
- palette
- positions
- shadows
- sizing
- spacing
- typography

```tsx
<Box component="span" m={1}>
  <Button />
</Box>
```

## Container

The container centers your content horizontally. It's the most basic layout element.

A fluid container width is bounded by the `maxWidth` property value.

```tsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </React.Fragment>
  );
}
```

## Grid

The grid creates visual consistency between layouts while allowing flexibility across a wide variety of designs. Material Design’s responsive UI is based on a 12-column grid layout.

The grid system is implemented with the Grid component:

- It uses CSS’s Flexible Box module for high flexibility.
- There are two types of layout: containers and items.
- Item widths are set in percentages, so they’re always fluid and sized relative to their parent element.
- Items have padding to create the spacing between individual items.
- There are five grid breakpoints: `xs`, `sm`, `md`, `lg`, and `xl`.


### Spacing

The `spacing` property is an integer between `0` and `10` inclusive. By default, the spacing between two grid items follows a linear function: `output(spacing) = spacing * 8px`, e.g. `spacing={2}` creates a 16px wide gap.

```tsx
import Grid from '@material-ui/core/Grid';

<Grid container className={classes.root} spacing={2}>
  <Grid item xs={12}>
  </Grid>
</Grid>
```


### Fluid grids

```tsx
<Grid container spacing={3}>
  <Grid item xs={12}>
    <Paper className={classes.paper}>xs=12</Paper>
  </Grid>
  <Grid item xs={12} sm={6}>
    <Paper className={classes.paper}>xs=12 sm=6</Paper>
  </Grid>
  <Grid item xs={12} sm={6}>
    <Paper className={classes.paper}>xs=12 sm=6</Paper>
  </Grid>
</Grid>
```


### Auto-layout

The Auto-layout makes the items equitably share the available space. That also means you can set the width of one item and the others will automatically resize around it.

```tsx
<Grid container spacing={3}>
  <Grid item xs>
    <Paper className={classes.paper}>xs</Paper>
  </Grid>
  <Grid item xs={6}>
    <Paper className={classes.paper}>xs=6</Paper>
  </Grid>
  <Grid item xs>
    <Paper className={classes.paper}>xs</Paper>
  </Grid>
</Grid>
```

### Nested Grid

The `container` and `item` properties are two independent booleans. They can be combined.

```tsx
<Grid container spacing={1}>
  <Grid container item xs={12} spacing={3}>
    <Grid item xs={4}>
      <Paper className={classes.paper}>item</Paper>
    </Grid>
    <Grid item xs={4}>
      <Paper className={classes.paper}>item</Paper>
    </Grid>
  </Grid>
</Grid>
```


## Grid List

Grid lists display a collection of images in an organized grid.

```tsx
<GridList cellHeight={160} className={classes.gridList} cols={3}>
  {tileData.map((tile) => (
    <GridListTile key={tile.img} cols={tile.cols || 1}>
      <img src={tile.img} alt={tile.title} />
    </GridListTile>
  ))}
</GridList>
```

- [Grid list with titlebars](https://material-ui.com/components/grid-list/#grid-list-with-titlebars)
- [Single line Grid list](https://material-ui.com/components/grid-list/#single-line-grid-list)


## Hidden

```tsx
<Hidden xsUp>
  <Paper className={classes.paper}>xsUp</Paper>
</Hidden>
<Hidden smUp>
  <Paper className={classes.paper}>smUp</Paper>
</Hidden>
<Hidden mdUp>
  <Paper className={classes.paper}>mdUp</Paper>
</Hidden>
<Hidden lgUp>
  <Paper className={classes.paper}>lgUp</Paper>
</Hidden>
<Hidden xlUp>
  <Paper className={classes.paper}>xlUp</Paper>
</Hidden>
```

```tsx
<Hidden xsDown>
  <Paper className={classes.paper}>xsDown</Paper>
</Hidden>
<Hidden smDown>
  <Paper className={classes.paper}>smDown</Paper>
</Hidden>
<Hidden mdDown>
  <Paper className={classes.paper}>mdDown</Paper>
</Hidden>
<Hidden lgDown>
  <Paper className={classes.paper}>lgDown</Paper>
</Hidden>
<Hidden xlDown>
  <Paper className={classes.paper}>xlDown</Paper>
</Hidden>
```

```tsx
<Hidden only="lg">
  <Paper className={classes.paper}>Hidden on lg</Paper>
</Hidden>
<Hidden only="sm">
  <Paper className={classes.paper}>Hidden on sm</Paper>
</Hidden>
<Hidden only={['sm', 'lg']}>
  <Paper className={classes.paper}>Hidden on sm and lg</Paper>
</Hidden>
```