# Basic

## Simple

```js
import styled from 'styled-components'
import { space, layout, color } from 'styled-system'

const Box = styled.div`
  ${space}
  ${layout}
  ${color}
`

export default Box
```

```jsx
<Box color="#fff" bg="tomato">
  Tomato
</Box>
```


## Theming

```js
// theme.js
export default {
  colors: {
    black: '#000e1a',
    white: '#fff',
    blue: '#007ce0',
    navy: '#004175',
  },
}
```

```js
// App.jsx
import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './theme'

const App = props => (
  <ThemeProvider theme={theme}>{/* application elements */}</ThemeProvider>
)

export default App
```

```jsx
<Box color="black" bg="blue">
  Blue Box
</Box>
```

Styled System will attempt to find a value based on keys in the theme and fallback to the raw value if it's not defined in the theme.


## Spacing

Margin Props

- `m` margin
- `mt` margin-top
- `mr` margin-right
- `mb` margin-bottom
- `ml` margin-left
- `mx` margin-left and margin-right
- `my` margin-top and margin-bottom

Padding Props

- `p` padding
- `pt` padding-top
- `pr` padding-right
- `pb` padding-bottom
- `pl` padding-left
- `px` padding-left and padding-right
- `py` padding-top and padding-bottom

## Space Theming

```js
// theme.js
export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
}
```

```jsx
<Box mt={1} p={2}>
  Blue Box
</Box>
```

All spacing props accept numbers, strings, or arrays as values, where:

- Numbers **between 0 and the last index** of the space array are values from the space array defined in theme
- Numbers **greater than the length of the space array** are converted to pixels
- String values can be used for any valid CSS value (e.g. 'auto' or '2em')
- Margin props accept negative values to set negative margin
- Arrays can be used for responsive styles
- Note: numeric strings without a CSS unit will be used as indices for the array (e.g. `space['0']`)


## Layout

The `layout` function adds props for widths, heights, display, and more. Widths and heights can use values defined in `theme.sizes` to help ensure consistency in layout styles.

```js
// theme.js
export default {
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
}
```

The `width` prop accepts number, string, or array values, where:

- Numbers between 0 and 1 are converted to percentage based widths (e.g. 1/2 becomes `'50%'`)
- Numbers greater than 1 are converted to pixels
- Strings can be used for other CSS values (e.g. `'50vw'` or `'30em'`)
- Arrays can be used for responsive styles
- If an array is used to define theme.sizes, `width={0}` will return `theme.sizes[0]` and `width={1}` will return `theme.sizes[1]`


## Responsive Styles

```js
<Box
  width={[
    1, // 100% below the smallest breakpoint (all viewports)
    1 / 2, // 50% from the next breakpoint and up
    1 / 4, // 25% from the next breakpoint and up
  ]}
/>

// responsive font size
<Box fontSize={[ 1, 2, 3, 4 ]} />

// responsive margin
<Box m={[ 1, 2, 3, 4 ]} />

// responsive padding
<Box p={[ 1, 2, 3, 4 ]} />
```