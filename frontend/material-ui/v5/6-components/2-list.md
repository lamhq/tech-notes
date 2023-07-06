# Lists

Lists are continuous, vertical indexes of text or images.

## Basic

```tsx
<List>
  <ListItemButton component="a" href="#simple-list">
    <ListItemText primary="Spam" />
  </ListItemButton>
  <ListItemButton>
    <ListItemIcon>
      <InboxIcon />
    </ListItemIcon>
    <ListItemText primary="Inbox" />
  </ListItemButton>
<List>
```

## Nested List

```tsx
<List component="nav">
  <ListItemButton onClick={handleClick}>
    <ListItemIcon>
      <InboxIcon />
    </ListItemIcon>
    <ListItemText primary="Inbox" />
    {open ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="Starred" />
      </ListItemButton>
    </List>
  </Collapse>
</List>
```