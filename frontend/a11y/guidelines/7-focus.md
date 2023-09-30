# Visual Focus

Visual focus is sometimes called keyboard focus or tab focus. It is a visual indicator on a interactive component that has keyboard focus. The effect is often a border or outline.

**Do not remove or hide the focus**. Whatever you do, do not remove the focus. Leave it or customize it. Removing it is not an option.

## Outline

This CSS line is ruining the accessibility for a lot of people:

```css
outline: 0;
```

To better make custom visual focus, you need to know about the different CSS `outline` properties.


## Overflow

Another common method for hiding the focus that the parent element is to small to show it, in combination with:

```css
overflow: hidden;
```

![](https://www.w3schools.com/accessibility/img_airbnb_focus.png)

In this example from Airbnb, the destination Ålesund is the focused element. However, it is not possible to tell. The reason is that the parent `<div`> has `overflow: hidden;`
