# Customizing components

## Static style

Specific variation for a one-time situation

### Overriding styles with class names

```tsx
import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles, WithStyles } from '@material-ui/core/styles';

interface Props extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  className?: string;
}

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

function ClassNames(props: Props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      {children || 'class names'}
    </Button>
  );
}

export default withStyles(styles)(ClassNames);
```

### Overriding styles with classes

```tsx
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default function ClassesShorthand() {
  return <StyledButton>classes shorthand</StyledButton>;
}
```

### Overriding styles with global class names

```tsx
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';

export const TextField = withStyles({
  root: {
    marginBottom: '1.4375rem',
    '& .MuiInput-underline': {
      '&:before': {
        borderColor: '#BFBFBF',
      },
      '&:after': {
        borderColor: '#BFBFBF',
      },
    },
  },
})((props: TextFieldProps) => (
  <MuiTextField
    {...props}
    fullWidth
    InputLabelProps={{
      shrink: true,
    }}
  />
));
```

### Overriding with inline-styles

```tsx
import React from 'react';
import Button from '@material-ui/core/Button';

// We can use inline-style
const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

export default function InlineStyle() {
  return <Button style={style}>inline-style</Button>;
}
```

### Pseudo-classes

- checked: `Mui-checked`
- disabled: `Mui-disabled`
- error: `Mui-error`
- focused: `Mui-focused`
- focusVisible: `Mui-focusVisible`
- required: `Mui-required`
- expanded: `Mui-expanded`
- selected: `Mui-selected`

```css
.MenuItem {
  color: black;
}
.MenuItem.Mui-selected { /* Increase the specificity */
  color: blue;
}
```

```tsx
<MenuItem selected className="MenuItem">
```


## Dynamic style

Dynamic variation for a one-time situation


### Class name

```tsx
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  buttonBlue: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  },
});

export default function DynamicClassName() {
  const classes = useStyles();
  const [color, setColor] = React.useState<string>('default');

  return (
    <Button
      className={clsx(classes.button, {
        [classes.buttonBlue]: color === 'blue',
      })}
    >
      Class name branch
    </Button>
  );
}
```

### Adapting based on props

See [Styles](../3-styles.md#adapting-based-on-props) section.


### Global theme variation

### Theme variables

```ts
const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

### Global CSS override

```tsx
const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiButton-root': {
      fontSize: '1rem',
    },
  },
})(() => null);
```

### Global theme override

See [Theming](./1-theming.md#globals) section

```ts
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});
```