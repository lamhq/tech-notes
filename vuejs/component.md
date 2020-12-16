# Components

```js
// Define a new component called button-counter
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```


## Passing Data to Child Components with Props

```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

```html
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```

We can use `v-bind` to dynamically pass props.

```js
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
```

```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post
```


## Listening to Child Components Events

```html
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
```


## Using `v-model` on Components

```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```


## Content Distribution with Slots

```js
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

```html
<alert-box>
  Something bad happened.
</alert-box>
```


## DOM Template Parsing Caveats

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```