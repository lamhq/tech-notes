# Borders

## Border

```tsx
<Box border={1}>…
<Box borderTop={1}>…
<Box borderRight={1}>…
<Box borderBottom={1}>…
<Box borderLeft={1}>…
```

```tsx
import React from 'react';
import Box from '@material-ui/core/Box';

const defaultProps = {
  bgcolor: 'background.paper',
  border: 1,
  m: 1,
  borderColor: 'text.primary',
  style: { width: '5rem', height: '5rem' },
};

export default function BorderSubtractive() {
  return (
    <>
      <Box {...defaultProps} border={0} />
      <Box {...defaultProps} borderTop={0} />
      <Box {...defaultProps} borderRight={0} />
      <Box {...defaultProps} borderBottom={0} />
      <Box {...defaultProps} borderLeft={0} />
    </>
  );
}
```

## Border color

```tsx
<Box borderColor="primary.main">…
<Box borderColor="secondary.main">…
<Box borderColor="error.main">…
<Box borderColor="grey.500">…
<Box borderColor="text.primary">…
```

## Border radius

```tsx
<Box borderRadius="50%">…
<Box borderRadius="borderRadius">…
<Box borderRadius={16}>…
```

### API

https://material-ui.com/system/borders/#api