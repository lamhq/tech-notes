# Conditional Rendering

## `v-if`

Using `v-if` and `v-for` together is not recommended.

```html
<!-- v-if -->
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>

<!-- Conditional Groups -->
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>

<!-- v-else-if -->
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```


## Controlling Reusable Elements with `key`

Vue tries to render elements as efficiently as possible, often re-using them instead of rendering from scratch. This isn’t always desirable though, so Vue offers a way for you to say, "These two elements are completely separate - don’t re-use them." Add a `key` attribute with unique values:

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```


## `v-show`

An element with `v-show` will always be rendered and remain in the DOM; `v-show` only toggles the display CSS property of the element.

```html
<h1 v-show="ok">Hello!</h1>
```