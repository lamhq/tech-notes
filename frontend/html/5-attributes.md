# Attributes

Attributes define the behavior, linkages, and functionality of elements.

Some attributes are global, meaning they can appear within any element's opening tag. Other attributes apply to several elements but not all, while other attributes are element-specific, relevant only to a single element.

## Global attributes

### `tabindex`

The `tabindex` attribute can be added to any element to enable it to receive focus.

The `tabindex` attribute takes as its value an integer: 
- A negative value (the convention is to use `-1`) makes an element capable of receiving focus, such as via JavaScript, but does not add the element to the tabbing sequence.
- A `tabindex` value of `0` makes the element focusable and reachable via tabbing, adding it to the default tab order of the page in source code order.
- A value of `1` or more puts the element into a prioritized focus sequence and is not recommended.


### `role`

The [`role` attribute](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Roles) is part of the [ARIA specification](https://w3c.github.io/aria/#introroles).

The `role` attribute can be used to provide semantic meaning to 
content, enabling screen readers to inform site users of an 
object's expected user interaction.

*For example, Including the `tab` role with `<button role="tab">` when a group of buttons is used to show different panels lets the screen reader user know that the `<button>` that currently has focus can toggle a related panel into view rather than implementing typical button-like functionality.*


### `contenteditable`

An element with the `contenteditable` attribute set to `true` is editable, is focusable, and is added to the tab order as if
`tabindex="0"` were set.

`Contenteditable` is an enumerated attribute supporting the values `true` and `false`, with a default value of `inherit`
if the attribute is not present or has an invalid value.


## Custom attributes

You can create any custom attribute you want by adding the [`data-`](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/data-*) prefix.

You can name your attribute anything that starts with `data-`
followed by any lowercase series of characters that don't start with `xml` and don't contain a colon (`:`).

Custom properties are an excellent way of communicating application-specific information via JavaScript. Add custom attributes to elements in the form of `data-name `and access these through the DOM using `dataset[name]` on the element in question.

```html
<blockquote data-machine-learning="workshop"
  data-first-name="Blendan" data-last-name="Smooth"
  data-formerly="Margarita Maker" data-aspiring="Load Balancer"
  data-year-graduated="2022">
  HAL and EVE could teach a fan to blow hot air.
</blockquote>
```

You can use `getAttribute()` using the full attribute name, or you can take advantage of the simpler [`dataset`](https://developer.mozilla.org/docs/Web/API/HTMLElement/dataset) property.

```js
el.dataset[machineLearning]; // workshop
e.dataset.machineLearning; // workshop
```

The `dataset` property returns a `DOMStringMap` object of each element's `data-` attributes.