# List Rendering

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```


## `v-for` with an Object

```html
<div v-for="(value, name, index) in object">
  {{ name }}: {{ value }}
</div>
```

```js
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})
```


## Maintaining State

To give Vue a hint so that it can track each node’s identity, and thus reuse and reorder existing elements, you need to provide a unique `key` attribute for each item:

```html
<div v-for="item in items" v-bind:key="item.id">
  <!-- content -->
</div>
```


## `v-for` with a Range

```html
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```


## `v-for` on a `<template>`

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-for` with a Component

```html
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```