# Lists

## Description lists

A description list is a [description list](https://developer.mozilla.org/docs/Web/HTML/Element/dl) (`<dl>`) element containing
a series of (zero or more) [description terms](https://developer.mozilla.org/docs/Web/HTML/Element/dt) (`<dt>`) and
their [description details](https://developer.mozilla.org/docs/Web/HTML/Element/dd) (`<dd>`).

They are made up of key/value pairs.

The `<dl>` is the parent container. The `<dt>` and `<dd>` elements are the children of the `<dl>`.

When creating a list of terms and their definitions or descriptions, or similar lists of key-value pairs, the description lists elements provide the appropriate semantics. The implicit role of a `<dt>` is `term` with `listitem` being another allowed role. The implicit role of a `<dd>` is `definition` with no other roles permitted.

The `<dl>` does not have an implicit ARIA role. 

Each `<dt>` has at least one associated `<dd>`, and each `<dd>` has at least one associated `<dt>`.

```html
<dl>
  <dt>Coffee</dt>
  <dd>Black hot drink</dd>
  <dt>Milk</dt>
  <dd>White cold drink</dd>
</dl>
```