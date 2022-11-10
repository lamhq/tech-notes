# Variants

## Basic

When defining variants inline, you can use Styled System like syntax to pick up values from your theme.

```jsx
import styled, { ThemeProvider } from 'styled-components';
import { variant } from 'styled-system';

const Button = styled.button`
  ${variant({
    variants: {
      primary: {
        color: 'primary',
      },
      secondary: {
        color: 'secondary',
      },
    },
  })}
`;

const theme = {
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
};
```

``jsx
<Button variant='primary'>Primary</Button>
<Button variant='secondary'>Secondary</Button>
```


## Custom Prop Name

If you'd like to use a custom prop name other than `variant`, use the prop option.

```jsx
const Text = styled('div')(
  variant({
    prop: 'size',
    variants: {
      big: {
        fontSize: 4,
        lineHeight: 'heading',
      },
      small: {
        fontSize: 1,
        lineHeight: 'body',
      },
    }
  })
)

<Text size='big' />
```


## Built-in Variants

| Function Name | Prop        | Theme Key     |
| ------------- | ----------- | ------------- |
| `textStyle`   | `textStyle` | `textStyles`  |
| `colorStyle`  | `colors`    | `colorStyles` |
| `buttonStyle` | `variant`   | `buttons`     |