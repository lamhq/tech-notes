# Ignoring Code

## Ignoring Files: `.prettierignore`

To exclude files from formatting, create a `.prettierignore` file

```
# Ignore artifacts:
build
coverage

# Ignore all HTML files:
*.html
```


## JavaScript

A JavaScript comment of `// prettier-ignore` will exclude the next node in the abstract syntax tree from formatting.

```js
// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```


## JSX

```jsx
<div>
  {/* prettier-ignore */}
  <span     ugly  format=''   />
</div>
```

## HTML

```html
<!-- prettier-ignore -->
<div         class="x"       >hello world</div            >

<!-- prettier-ignore-attribute -->
<div
  (mousedown)="       onStart    (    )         "
  (mouseup)="         onEnd      (    )         "
></div>

<!-- prettier-ignore-attribute (mouseup) -->
<div
  (mousedown)="onStart()"
  (mouseup)="         onEnd      (    )         "
></div>
```


## CSS

```css
/* prettier-ignore */
.my    ugly rule
{

}
```