# Grid Layout

> *You could think of grid as "two dimensional"*.

> *Use grid when you already have the layout structure in mind, and flex when you just want everything to fit. Layout first vs content first.*

## Concepts

### Grid Container

The element on which `display: grid` is applied.

```html
<div class="container">
  <div class="item item-1"> </div>
  <div class="item item-2"> </div>
  <div class="item item-3"> </div>
</div>
```

### Grid Item

The children (direct descendants) of the grid container.


### Grid Line

The dividing lines that make up the structure of the grid (vertical and horizontal).

![](https://css-tricks.com/wp-content/uploads/2018/11/terms-grid-line.svg)


### Grid Track

The space between two adjacent grid lines.

![](https://css-tricks.com/wp-content/uploads/2018/11/terms-grid-track.svg)


### Grid Cell

The space between two adjacent row and two adjacent column grid lines

![](https://css-tricks.com/wp-content/uploads/2018/11/terms-grid-cell.svg)


### Grid Area

The total space surrounded by four grid lines. A grid area may be composed of any number of grid cells.

![](https://css-tricks.com/wp-content/uploads/2018/11/terms-grid-track.svg)


### Implicit tracks

Implicit tracks get created when there are more grid items than cells in the grid or when a grid item is placed outside of the explicit grid.


## Properties for the Parent

### `display`

Defines the element as a grid container

- `grid` – generates a block-level grid
- `inline-grid` – generates an inline-level grid


### `grid-template-columns`, `grid-template-rows`

Defines the columns and rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line.

```css
.container {
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/template-columns-rows-01.svg)


### `grid-template-areas`

Defines a grid template by referencing the names of the grid areas

- `<grid-area-name>`: the name of a grid area specified with grid-area
- `.`: a period signifies an empty grid cell
- `none`: no grid areas are defined

```css
.container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas:
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}

.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/dddgrid-template-areas.svg)


### `grid-auto-columns`, `grid-auto-rows`

Specifies the size of any auto-generated grid tracks

```css
.container {
  grid-template-columns: 60px 60px;
  grid-template-rows: 90px 90px;
  grid-auto-columns: 60px;
}

.item-a {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.item-b {
  grid-column: 5 / 6;
  grid-row: 2 / 3;
}
```

We told `.item-b` to start on column line 5 and end at column line 6, **but we never defined a column line 5 or 6**. Because we referenced lines that don’t exist, implicit tracks with widths of 0 are created to fill in the gaps. We can use `grid-auto-columns` and `grid-auto-rows` to specify the widths and heights of these implicit tracks:

![](https://css-tricks.com/wp-content/uploads/2018/11/grid-auto-columns-rows-03.svg)


### `grid-auto-flow`

If you have grid items that you don’t explicitly place on the grid, the *auto-placement algorithm* kicks in to automatically place the items. This property controls how the auto-placement algorithm works.

- `row`: tells the auto-placement algorithm to add new rows as necessary (default)
- `column`: tells the auto-placement algorithm to add new columns as necessary
- `dense`: tells the auto-placement algorithm to fill in holes earlier in the grid if smaller items come up later, might cause items to appear out of order.

```css
.container {
  grid-auto-flow: row | column | row dense | column dense;
}
```

### `grid-template`

A shorthand for setting all of the following properties in a single declaration:

- `grid-template-rows`
- `grid-template-columns`
- `grid-template-areas`

Values:

- `none`: sets all three properties to their initial values
- `<grid-template-rows> / <grid-template-columns>`


The following two code blocks are equivalent:

```css
.container {
  grid-template:
    [row1-start] "header header header" 25px [row1-end]
    [row2-start] "footer footer footer" 25px [row2-end]
    / auto 50px auto;
}

.container {
  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
  grid-template-columns: auto 50px auto;
  grid-template-areas:
    "header header header"
    "footer footer footer";
}
```


### `grid`

A shorthand for setting all of the following properties in a single declaration:

- `grid-template-rows`
- `grid-template-columns`
- `grid-template-areas`
- `grid-auto-rows`
- `grid-auto-columns`
- `grid-auto-flow`

Values:

- `none`
- `<grid-template>`: works the same as the `grid-template` shorthand.
- `<grid-template-rows> / [ auto-flow && dense? ] <grid-auto-columns>?`
- `[ auto-flow && dense? ] <grid-auto-rows>? / <grid-template-columns>`


### `justify-items`, `align-items`, `place-items`

`justify-items` aligns items in grid horizontally. This behavior can also be set on individual grid items via the `justify-self` property.

- `start`: aligns items to be flush with the start edge of their cell
- `end`: aligns items to be flush with the end edge of their cell
- `center`: aligns items in the center of their cell
- `stretch`: fills the whole width of the cell (default)

```css
.container {
  justify-items: start | end | center | stretch;
}
```

`start`:
![](https://css-tricks.com/wp-content/uploads/2018/11/justify-items-start.svg)

`end`:
![](https://css-tricks.com/wp-content/uploads/2018/11/justify-items-end.svg)

`center`:
![](https://css-tricks.com/wp-content/uploads/2018/11/justify-items-center.svg)

`stretch`:
![](https://css-tricks.com/wp-content/uploads/2018/11/justify-items-stretch.svg)


`align-items` aligns items in grid vertically. This behavior can also be set on individual grid items via the `align-self` property.

```css
.container {
  align-items: start | end | center | stretch;
}
```

`start`:
![](https://css-tricks.com/wp-content/uploads/2018/11/align-items-start.svg)

`end`:
![](https://css-tricks.com/wp-content/uploads/2018/11/align-items-end.svg)

`center`:
![](https://css-tricks.com/wp-content/uploads/2018/11/align-items-center.svg)

`stretch`:
![](https://css-tricks.com/wp-content/uploads/2018/11/align-items-stretch.svg)


`place-items` sets both the `align-items` and `justify-items` properties in a single declaration:

```css
.container {
  place-items: <align-items> / <justify-items>;
}
```

### `justify-content`, `align-content`, `place-content`

Sometimes the total size of your grid might be less than the size of its grid container. This could happen if all of your grid items are sized with non-flexible units like `px`. In this case you can set the alignment of the grid within the grid container.

`justify-content` aligns the grids in container horizontally.

```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-content-start.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-content-end.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-content-center.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-content-stretch.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-content-space-around.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-content-space-between.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-content-space-evenly.svg)


`align-content` aligns the grids in container vertically.

```css
.container {
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```

`place-content` sets both the `align-content` and `justify-content` properties in a single declaration:

```css
.container {
  place-content: <align-content> / <justify-content>;
}
```


### `column-gap`, `row-gap`, `gap`

Specifies the size of the grid lines

```css
.container {
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 80px 80px 80px;
  row-gap: 15px;
  column-gap: 10px;
  /* gap: <grid-row-gap> <grid-column-gap>; */
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/dddgrid-gap.svg)


## Length values

- `none`: Default value. Columns are created if needed
- `auto`: The size of the columns is determined by the size of the container and on the size of the content of the items in the column
- `max-content`: Size of the largest item in the column/row
- `min-content`: Size of the the smallest item in the column/row
- `initial`: set a CSS property to its default value.
- `inherit`: specifies that a property should inherit its value from its parent element.
- length: `px`, `rem`, `%`, `fr`


### `fr`

The fr unit allows you to set the size of a track as a fraction of the free space of the grid container. The free space is calculated after any non-flexible items.

```css
.container {
  grid-template-columns: 1fr 50px 1fr 1fr;
}
```

## Functions

### `repeat()`

If your definition contains repeating parts, you can use the `repeat()` notation to streamline things:

```css
.container {
  grid-template-columns: repeat(3, 20px);
  /* grid-template-columns: 20px 20px 20px; */
}
```

- `auto-fill`: **FILLS** the row with as many columns as it can fit. So it creates implicit columns whenever a new column can fit, because it’s trying to FILL the row with as many columns as it can. The newly added columns can and may be empty, but they will still occupy a designated space in the row.

- `auto-fit`: **FITS** the CURRENTLY AVAILABLE columns into the space by expanding them so that they take up any available space. The browser does that after FILLING that extra space with extra columns (as with `auto-fill`) and then collapsing the empty ones.

```css
.container {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

See demo [here](https://codepen.io/SaraSoueidan/pen/JrLdBQ).


### `minmax()`

Sets a size range greater than or equal to min and less than or equal to max.

For example, set a column to be `1fr`, but shrink no further than `200px`:

```css
.container {
  grid-template-columns: 1fr minmax(200px, 1fr);
}
```

## Properties for the Children

### `grid-column-start`, `grid-column-end`, `grid-row-start`, `grid-row-end`

Determines a grid item’s location within the grid by referring to specific grid lines.

Values:

- `<line>`: can be a number to refer to a numbered grid line, or a name to refer to a named grid line
- `span <number>`: the item will span across the provided number of grid tracks
- `span <name>`: the item will span across until it hits the next line with the provided name
- `auto`: indicates auto-placement, an automatic span, or a default span of one

```css
.item {
  grid-column-start: <number> | <name> | span <number> | span <name> | auto;
  grid-column-end: <number> | <name> | span <number> | span <name> | auto;.item {
  grid-column-start: <number> | <name> | span <number> | span <name> | auto;
  grid-column-end: <number> | <name> | span <number> | span <name> | auto;
  grid-row-start: <number> | <name> | span <number> | span <name> | auto;
  grid-row-end: <number> | <name> | span <number> | span <name> | auto;
}
  grid-row-start: <number> | <name> | span <number> | span <name> | auto;
  grid-row-end: <number> | <name> | span <number> | span <name> | auto;
}
```

Examples:

```css
.item-a {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start;
  grid-row-end: 3;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/grid-column-row-start-end-01.svg)

```css
.item-b {
  grid-column-start: 1;
  grid-column-end: span col4-start;
  grid-row-start: 2;
  grid-row-end: span 2;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/grid-column-row-start-end-02.svg)


### `grid-column`, `grid-row`

Shorthand for` grid-column-start` + `grid-column-end`, and `grid-row-start` + `grid-row-end`, respectively.

```css
.item {
  grid-column: <start-line> / <end-line> | <start-line> / span <value>;
  grid-row: <start-line> / <end-line> | <start-line> / span <value>;
}
```

Example:

```css
.item-c {
  grid-column: 3 / span 2;
  grid-row: third-line / 4;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/grid-column-row.svg)


### `grid-area`

Refer to the area created with the `grid-template-areas` property. Alternatively, this property can be used as an even shorter shorthand for `grid-row-start` + `grid-column-start` + `grid-row-end` + `grid-column-end`.

Values:

- `<name>`: a name of your choosing
- `<row-start> / <column-start> / <row-end> / <column-end>`: can be numbers or named lines

```css
.item {
  grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}
```

Examples:

```css
.item-d {
  grid-area: header;
}

.item-d {
  grid-area: 1 / col4-start / last-line / 6;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/grid-area.svg)


### `justify-self`, `align-self`, `place-self`

- `justify-self`: Aligns a grid item inside a cell along the inline (row) axis
- `align-self`: Aligns a grid item inside a cell along the block (column) axis

Values:

- `start`: aligns the grid item to be flush with the start edge of the cell
- `end`: aligns the grid item to be flush with the end edge of the cell
- `center`: aligns the grid item in the center of the cell
- `stretch`: fills the whole width of the cell (this is the default)

```css
.item {
  justify-self: start | end | center | stretch;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-self-start.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-self-end.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-self-center.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-self-stretch.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/align-self-start.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/align-self-end.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/align-self-center.svg)

![](https://css-tricks.com/wp-content/uploads/2018/11/align-self-stretch.svg)

`place-self` sets both the `align-self` and `justify-self` properties in a single declaration. Values:

- `auto`: The “default” alignment for the layout mode.
- `<align-self> / <justify-self>`: If the second value is omitted, the first value is assigned to both properties.


## Snippets

```html
<style>
.container {
  background-image: linear-gradient(to right bottom, #ffa400, #e74c3c);
  height: auto;
  padding: 50px;
  display: grid;
  grid-template-columns: 500px 200px;
}

.item {
  color: black;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  border: 2px solid orange;
}
</style>

<div class="container">
  <div class="item item1">1</div>
  <div class="item item2">2</div>
  <div class="item item3">3</div>
  <div class="item item4">4</div>
  <div class="item item5">5</div>
  <div class="item item6">6</div>
  <div class="item item7">7</div>
  <div class="item item8">8</div>
  <div class="item item9">9</div>
  <div class="item item10">10</div>
</div>
```
