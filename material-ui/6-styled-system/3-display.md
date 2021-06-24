# Display

## Inline

```tsx
<Box component="div" display="inline">inline</Box>
<Box component="div" display="inline">inline</Box>
```


## Block

```tsx
<Box component="span" display="block">block</Box>
<Box component="span" display="block">block</Box>
```

## Hiding

https://material-ui.com/system/display/#hiding-elements

```tsx
<Box display={{ xs: 'block', md: 'none' }}>
  hide on screens wider than md
</Box>
<Box display={{ xs: 'none', md: 'block' }}>
  hide on screens smaller than md
</Box>
```

## Text Overflow

```tsx
<Box component="div" textOverflow="clip">
  Text Overflow Clip
</Box>
<Box component="div" textOverflow="ellipsis">
  Text Overflow Ellipsis
</Box>
```

## Visibility

```tsx
<Box component="div" visibility="visible">
  Visibility Visible
</Box>
<Box component="div" visibility="hidden">
  Visibility Hidden
</Box>
```

## API

https://material-ui.com/system/display/#api