# Basics

## JSS

If you are already using `@material-ui/core`, we encourage you to start with the JSS solution to minimize bundle size.

```tsx
import React from 'react';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';

const Box = styled('div')(compose(spacing, palette));

export default function JSS() {
  return (
    <Box color="white" bgcolor="palevioletred" p={1}>
      JSS
    </Box>
  );
}
```

## Responsive

```ts
const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const theme = {
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: key => `@media (min-width:${values[key]}px)`,
  },
};
```

### Array

```tsx
<Box p={[2, 3, 4]} />

/**
 * Outputs:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

### Object:=

```tsx
<Box p={{ xs: 2, sm: 3, md: 4 }} />

/**
 * Outputs:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

### Collocation

If you want to group the breakpoint values, you can use the `breakpoints()` helper:

```tsx
import { compose, spacing, palette, breakpoints } from '@material-ui/system';
import styled from 'styled-components';

const Box = styled.div`
  ${breakpoints(
    compose(
      spacing,
      palette,
    ),
  )}
`;

<Box
  p={2}
  sm={{ p: 3 }}
  md={{ p: 4 }}
/>

/**
 * Outputs:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

## Custom style props

It helps you define custom prop for adjusting a CSS property of an element

```tsx
import styled from 'styled-components';
import { style } from '@material-ui/system';
import { Box } from '@material-ui/core';

const gridGap = style({
  prop: 'gridGap',
  themeKey: 'spacing',
});

const Grid = styled(Box)`${gridGap}`;
const example = <Grid display="grid" gridGap={[2, 3]}>...</Grid>;
```

```tsx
import styled from 'styled-components';
import { style } from '@material-ui/system';

const borderColor = style({
  prop: 'bc',
  cssProperty: 'borderColor',
  themeKey: 'palette',
  transform: value => `${value} !important`,
});

const Colored = styled.div`${borderColor}`;
const example = <Colored bc="primary.main">...</Colored>;
```

compose:

```ts
import styled from 'styled-components';
import { style, compose } from '@material-ui/system'

export const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

export const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
});

const palette = compose(textColor, bgcolor);
const Colored = styled.div`${palette}`;
```