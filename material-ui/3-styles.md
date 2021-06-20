# Styles

## Installation

```bash
yarn add @material-ui/styles
```

## Usage

### Hook API

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}
```

### Styled components API

```tsx
import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}
```

### Higher-order component API

```tsx
import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = createStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

function UnstyledComponent(props: WithStyles<typeof styles>) {
  const { classes } = props;
  return <Button className={classes.root}>Styled with HOC API</Button>;
}

export default withStyles(styles)(UnstyledComponent);
```

## Nesting selectors

```tsx
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: 'red',
    '& p': {
      margin: 0,
      color: 'green',
      '& span': {
        color: 'blue',
      },
    },
  },
});

export default function NestedStylesHook() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      This is red since it is inside the root.
      <p>
        This is green since it is inside the paragraph{' '}
        <span>and this is blue since it is inside the span</span>
      </p>
    </div>
  );
}
```

## Adapting based on props

### Hook API

```tsx
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { Omit } from '@material-ui/types';

interface Props {
  color: 'red' | 'blue';
}

const useStyles = makeStyles({
  root: {
    background: (props: Props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props: Props) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
});

function MyButton(props: Props & Omit<MuiButtonProps, keyof Props>) {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

export default function AdaptingHook() {
  return (
    <React.Fragment>
      <MyButton color="red">Red</MyButton>
      <MyButton color="blue">Blue</MyButton>
    </React.Fragment>
  );
}
```


### Styled components

```tsx
import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: (props: ButtonProps) =>
    props.color === 'primary'
      ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: (props: ButtonProps) =>
    props.color === 'secondary'
      ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
      : '0 3px 5px 2px rgba(33, 203, 243, .3)',
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: 8,
});

export const Default: React.VFC = () => {
  return (
    <>
      <MyButton color="primary">Red</MyButton>
      <MyButton color="secondary">Blue</MyButton>
    </>
  );
};
```

### Higher-order component API

```tsx
import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { Omit } from '@material-ui/types';

const styles = createStyles({
  root: {
    background: (props: MyButtonRawProps) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props: MyButtonRawProps) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
});

interface MyButtonRawProps {
  color: 'red' | 'blue';
}

function MyButtonRaw(
  props: WithStyles<typeof styles> & Omit<ButtonProps, keyof MyButtonRawProps> & MyButtonRawProps,
) {
  const { classes, color, ...other } = props;
  return <Button className={classes.root} {...other} />;
}

const MyButton = withStyles(styles)(MyButtonRaw);

export default function AdaptingHOC() {
  return (
    <React.Fragment>
      <MyButton color="red">Red</MyButton>
      <MyButton color="blue">Blue</MyButton>
    </React.Fragment>
  );
}
```

## @material-ui/core/styles vs @material-ui/styles

`@material-ui/styles` modules are re-exported from `@material-ui/core/styles`.

If you're using `@material-ui/core`, no need to install `@material-ui/styles`.

```ts
// Re-export with a default theme
import { makeStyles } from '@material-ui/core/styles';

// Original module with no default theme
import { makeStyles } from '@material-ui/styles';
```


## Overriding styles of components

### withStyles

The wrapped component accepts a `classes` prop, it simply merges the class names provided with the style sheet.

```tsx
const styles = {
  root: {}, // a style rule
  label: {}, // a nested style rule
}
const Nested = withStyles(styles)(({ classes }) => (
  <button className={classes.root}>
    <span className={classes.label}> // 'jss2 my-label'
      Nested
    </span>
  </button>
));

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />
}
```

### makeStyles

You have to forward the parent props to the hook as a first argument.

```tsx
const useStyles = makeStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
});

function Nested(props) {
  const classes = useStyles(props);
  return (
    <button className={classes.root}>
      <span className={classes.label}> // 'jss2 my-label'
        nested
      </span>
    </button>
  );
}

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />
}
```

## JSS Syntax

### Snippets

```js
import jss from 'jss'
import preset from 'jss-preset-default'
import color from 'color'

// One time setup with default plugins and settings.
jss.setup(preset())

const styles = {
  '@global': {
    body: {
      color: 'green'
    },
    a: {
      textDecoration: 'underline'
    }
  },
  withTemplates: `
    border-radius: 3px;
    background-color: green;
    color: red;
    margin: 20px 40px;
    padding: 10px;
  `,
  button: {
    fontSize: 12,
    '&:hover': {
      background: 'blue'
    }
  },
  ctaButton: {
    extend: 'button',
    '&:hover': {
      background: color('blue')
        .darken(0.3)
        .hex()
    }
  },
  '@media (min-width: 1024px)': {
    button: {
      width: 200
    }
  }
}

const {classes} = jss.createStyleSheet(styles).attach()

document.body.innerHTML = `
  <button class="${classes.button}">Button</button>
  <button class="${classes.ctaButton}">CTA Button</button>
`
```


### Media Queries

```js
const styles = {
  button: {
    width: 100
  },
  '@media (min-width: 1024px)': {
    button: {
      width: 200
    }
  }
}
```

### Keyframes Animation

```js
const styles = {
  '@keyframes slideRight': {
    from: {opacity: 0},
    to: {opacity: 1}
  },
  container: {
    animationName: '$slideRight'
  }
}
```

### Font Face

```js
const styles = {
  '@font-face': {
    fontFamily: 'MyWebFont',
    src: 'url(webfont.eot)'
  }
}

// Multiple font faces.
const styles = {
  '@font-face': [
    {
      fontFamily: 'MyWebFont',
      src: 'url(webfont.eot)'
    },
    {
      fontFamily: 'MySecondFont',
      src: 'url(webfont2.eot)'
    }
  ]
}
```

### Import

```js
const styles = {
  '@charset': '"utf-8"',
  '@import': 'url(http://mysite.com/custom.css)',
  '@namespace': 'url(http://mysite.com/xhtml)'
}
```

### Comma separated values

```js
const styles = {
  button: {
    // Comma separated value with regular CSS strings inside.
    background: ['url(image1.png)', 'url(image2.png)']
  }
}
```

```js
const styles = {
  button: {
    // Comma separated value with space separated values inside.
    background: [
      // Numbers can become default unit automatically.
      ['url(image1.png)', 'no-repeat', 'top'],
      ['url(image1.png)', 'no-repeat', 'right']
    ]
  }
}
```

```js
const styles = {
  button: {
    // Space separated value.
    margin: [[5, 10]]
    // margin: 5px 10px;
  }
}
```

```js
const styles = {
  button: {
    color: [['red'], '!important'],
    // color: red !important;
    margin: [[5, 10], '!important']
    // margin: 5px 10px !important;
  }
}
```

### Property content

```js
const styles = {
  button: {
    '&:after': {
      content: '"JSS"'
    }
  }
}
```

### Color

```js
import color from 'color'

const styles = {
  button: {
    color: color('blue')
      .darken(0.3)
      .hex()
    // color: '#0000B3';
  }
}
```