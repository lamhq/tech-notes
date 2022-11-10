# API

## Space

```js
import { space } from 'styled-system'
```

The space utility converts shorthand margin and padding props to margin and padding CSS declarations.

- Numbers from 0 to the length of `theme.space` are converted to values on the space scale.
- Negative values can be used for negative margins.
- Numbers greater than the length of the `theme.space` array are converted to raw pixel values.
- String values are passed as raw CSS values.
- And array values are converted into responsive values.

| Prop                  | CSS Property                   |
| --------------------- | ------------------------------ |
| `margin`, `m`         | margin                         |
| `marginTop`, `mt`     | margin-top                     |
| `marginRight`, `mr`   | margin-right                   |
| `marginBottom`, `mb`  | margin-bottom                  |
| `marginLeft`, `ml`    | margin-left                    |
| `marginX`, `mx`       | margin-left and margin-right   |
| `marginY`, `my`       | margin-top and margin-bottom   |
| `padding`, `p`        | padding                        |
| `paddingTop`, `pt`    | padding-top                    |
| `paddingRight`, `pr`  | padding-right                  |
| `paddingBottom`, `pb` | padding-bottom                 |
| `paddingLeft`, `pl`   | padding-left                   |
| `paddingX`, `px`      | padding-left and padding-right |
| `paddingY`, `py`      | padding-top and padding-bottom |


## Color

```js
import { color } from 'styled-system'
```

The color utility parses a component's `color` and `bg` props and converts them into CSS declarations. Color palettes can be configured with the ThemeProvider to use keys as prop values, with support for dot notation.

```jsx
// picks the value defined in `theme.colors.blue`
<Box color='blue' />

// picks up a nested color value using dot notation
// `theme.colors.gray[0]`
<Box color='gray.0' />

// raw CSS color value
<Box color='#f00' />

// background colors
<Box bg='blue' />

// verbose prop
<Box backgroundColor='blue' />
```


## Typography

```js
import { typography } from 'styled-system'
```

Typography props include `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `textAlign`, and `fontStyle`.

```jsx
// examples
// font-size of `theme.fontSizes[3]`
<Text fontSize={3} />

// font-size `32px`
<Text fontSize={32} />
```


## Layout

```js
import { layout } from 'styled-system'
```

The layout utility includes style props for `width`, `height`, `display`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`, `size`, `verticalAlign`, `overflow`, `overflowX`, and `overflowY`.

The `width` prop is transformed based on the following:

- Numbers from 0-1 are converted to percentage widths.
- Numbers greater than 1 are converted to pixel values.
- String values are passed as raw CSS values.
- And arrays are converted to responsive width styles.
- If `theme.sizes` is defined, the `width` prop will attempt to pick up values from the theme.


```jsx
// examples

// width `50%`
<Box width={1/2} />

// width `256px`
<Box width={256} />

// width `100%` on all viewports and `50%` from the smallest breakpoint and up
<Box width={[ 1, 1/2 ]} />

// width from `theme.sizes`
<Box width='medium' />

// size (width & height)
<Box size={32} />
<Box size={[ 32, 48 ]} />
```


## Background

```js
import { background } from 'styled-system'
```

The `background` utility includes style props for `backgroundImage`, `backgroundSize`, `backgroundPosition`, and `backgroundRepeat`.

```jsx
// example
<Box
  backgroundImage="url('kitten.png')"
  backgroundSize="cover"
  backgroundPosition="center"
  backgroundRepeat="repeat-x"
/>
```


## Flexbox

```js
import { flexbox } from 'styled-system'
```

The `flexbox` utility includes style props for `alignItems`, `alignContent`, `justifyItems`, `justifyContent`, `flexWrap`, `flexDirection`, `flex`, `flexGrow`, `flexShrink`, `flexBasis`, `justifySelf`, `alignSelf`, and `order`.

```jsx
// alignItems
<Flex alignItems='center' />

// justifyContent
<Flex justifyContent='center' />

// flexDirection
<Flex flexDirection='column' />

// flex
<Box flex='1 1 auto' />

// order
<Box order='2' />
```


## Grid Layout

```js
import { grid } from 'styled-system'
```

The `grid` utility includes style props for `gridGap`, `gridColumnGap`, `gridRowGap`, `gridColumn`, `gridRow`, `gridAutoFlow`, `gridAutoColumns`, `gridAutoRows`, `gridTemplateColumns`, `gridTemplateRows`, `gridTemplateAreas`, and `gridArea`.


```jsx
// gridGap
<Box gridGap={10} />
<Box gridGap={[ 1, 2 ]} />

// gridColumnGap
<Box gridColumnGap={10} />
<Box gridColumnGap={[ 1, 2 ]} />

// gridRowGap
<Box gridRowGap={10} />
<Box gridRowGap={[ 1, 2 ]} />

// gridColumn
<Box gridColumn={1} />

// gridRow
<Box gridRow={1} />
```


## References

https://styled-system.com/table