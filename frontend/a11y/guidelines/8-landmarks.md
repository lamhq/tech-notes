# Landmarks

## Intro

Landmarks are used to define different parts of a web page.

In HTML there are some semantic elements that can be used to define landmarks:

- `<header>`
- `<nav>`
- `<main>`
- `<aside>`
- `<section>`
- `<footer>`

One way to visualize landmarks is to use the tool [Accessibility Insights](https://accessibilityinsights.io/).


## Roles

Each landmark element has a corresponding role. 

- `<header>` has a built in role of banner. This means that both `<header>`, `<header role="banner">` and `<div role="banner">` are more or less equivalent.
- `<nav>` has `role="navigation"`. 
- `<main>` has `role="main"`. A rule of thumb is to only use one `<main>` per page.
- `<footer>` with its `role="contentinfo"`.


## More than one of each landmark

When we use more than one type of landmark (`<section>`, `<nav>`), we must label each of them. This is done with the attribute `aria-label`.

```html
<nav aria-label="social">...</nav>
```
