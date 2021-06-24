# Flexbox

## Parent

```tsx
<Box display="flex">…

<Box flexDirection="row">…
<Box flexDirection="row-reverse">…

<Box justifyContent="flex-start">…
<Box justifyContent="flex-end">…
<Box justifyContent="center">…

<Box alignItems="flex-start">…
<Box alignItems="flex-end">…
<Box alignItems="center">…

<Box alignContent="flex-start">…
<Box alignContent="flex-end">…
```

## Children

```tsx
<Box order={2}>Item 1</Box>
<Box order={3}>Item 2</Box>
<Box order={1}>Item 3</Box>

<Box flexGrow={1}>Item 1</Box>
<Box>Item 2</Box>
<Box>Item 3</Box>

<Box width="100%">Item 1</Box>
<Box flexShrink={1}>Item 2</Box>
<Box flexShrink={0}>Item 3</Box>

<Box>Item 1</Box>
<Box alignSelf="flex-end">Item 2</Box>
<Box>Item 3</Box>
```

## API

https://material-ui.com/system/flexbox/#api