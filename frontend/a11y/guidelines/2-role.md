# Accessibility Role, Name & Value

There are two cases where we can't use a good HTML element with built-in accessibility features, even though we want to:

- There is no native HTML element for what we are trying to achieve.
- There are technical limitations that prevents us using the semantically correct element.

In both cases, we need to build a custom control. An important accessibility principle is that a custom control needs a **role**, a **name** and sometimes a **value**.

## Role

A dropdown menu button should be coded as a `<button>`. What if our framework does not allow us to do that? (If it forces us to use an `<a>` instead?)

This is done with the `role="button"` attribute.

A `<button>` has the `role="button"` built in.

```html
<custom-element role="button">click me</ustom-element>
```

## Name

The custom control needs a name (also known as the accessible name).

The name of `div` element is the content of the element.

The `<select>` element has no name, To give it an accessible name, we must use the attribute `aria-label`.

```html
<select aria-label="Country calling code" name="countryCode">…</select>
```


## Value

Some components have a value or a state. 

An accordion is open or closed. This information has to be accessible.

![](https://www.w3schools.com/accessibility/img_uber_faq.png)

Each accordion header should be a `<button>` or `role="button"`. To give this button a value, we need to tell assistive technologies that it is closed. This is done with `aria-expanded="false"`:

```html
<div role="button" aria-expanded="false">When do I get charged for a ride?</div>
```
