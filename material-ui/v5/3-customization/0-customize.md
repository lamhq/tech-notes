# Customize the appearance of a MUI component

## Use the `sx` prop

```tsx
import * as React from 'react';
import Slider from '@mui/material/Slider';

export default function SxProp() {
  return (
    <Slider
      defaultValue={30}
      sx={{
        width: 300,
        color: 'success.main',
      }}
    />
  );
}
```

## Overriding nested component styles

MUI applies global class names using a consistent convention: `Mui[Component name]-[name of the slot]`.

You can use the browser dev tools to identify the slot for the component you want to override. 

For example, you need to target the `.MuiSlider-thumb` class name for overriding the look of the thumb:

```tsx
import * as React from 'react';
import Slider from '@mui/material/Slider';

export default function SxProp() {
  return (
    <Slider
      defaultValue={30}
      sx={{
        width: 300,
        color: 'success.main',
        '& .MuiSlider-thumb': {
          borderRadius: '1px',
        },
      }}
    />
  );
}
```

## State classes

| State         | Global class name   |
| :------------ | :------------------ |
| active        | `.Mui-active`       |
| checked       | `.Mui-checked`      |
| completed     | `.Mui-completed`    |
| disabled      | `.Mui-disabled`     |
| error         | `.Mui-error`        |
| expanded      | `.Mui-expanded`     |
| focus visible | `.Mui-focusVisible` |
| focused       | `.Mui-focused`      |
| required      | `.Mui-required`     |
| selected      | `.Mui-selected`     |

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

const CustomSlider = styled(Slider)({
  width: 300,
  color: '#4caf50',
  '& .MuiSlider-thumb': {
    [`&:hover, &.Mui-focusVisible`]: {
      boxShadow: '0px 0px 0px 8px rgb(76, 175, 80, .16)',
    },
    [`&.Mui-active`]: {
      boxShadow: '0px 0px 0px 14px rgb(76, 175, 80, .16)',
    },
  },
});
```

## Create reusable components

```tsx
import * as React from 'react';
import Slider, { SliderProps } from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';

const SuccessSlider = styled(Slider)<SliderProps>(({ theme }) => ({
  width: 300,
  color: theme.palette.success.main,
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    },
  },
}));

export default function StyledCustomization() {
  return <SuccessSlider defaultValue={30} />;
}
```

## Dynamic css based on props

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Slider, { SliderProps } from '@mui/material/Slider';

interface StyledSliderProps extends SliderProps {
  success?: boolean;
}

const StyledSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== 'success',
})<StyledSliderProps>(({ success, theme }) => ({
  ...(success &&
    {
      // the overrides added when the new prop is used
    }),
}));
```


## CSS variables

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const CustomSlider = styled(Slider)({
  width: 300,
  color: 'var(--color)',
  '& .MuiSlider-thumb': {
    [`&:hover, &.Mui-focusVisible`]: {
      boxShadow: '0px 0px 0px 8px var(--box-shadow)',
    },
    [`&.Mui-active`]: {
      boxShadow: '0px 0px 0px 14px var(--box-shadow)',
    },
  },
});

const successVars = {
  '--color': '#4caf50',
  '--box-shadow': 'rgb(76, 175, 80, .16)',
} as React.CSSProperties;

const defaultVars = {
  '--color': '#1976d2',
  '--box-shadow': 'rgb(25, 118, 210, .16)',
} as React.CSSProperties;

export default function DynamicCSSVariables() {
  const [vars, setVars] = React.useState<React.CSSProperties>(defaultVars);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVars(event.target.checked ? successVars : defaultVars);
  };

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch
            checked={vars === successVars}
            onChange={handleChange}
            color="primary"
            value="dynamic-class-name"
          />
        }
        label="Success"
      />
      <CustomSlider style={vars} defaultValue={30} sx={{ mt: 1 }} />
    </React.Fragment>
  );
}
```

## Global CSS override

```tsx
import * as React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';

const inputGlobalStyles = <GlobalStyles styles={...} />;

const Input = (props) => {
  return (
    <React.Fragment>
      {inputGlobalStyles}
      <input {...props} />
    </React.Fragment>
  )
}
```