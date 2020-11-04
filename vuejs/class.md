# Class and Style Bindings

## Binding HTML Classes

### Object Syntax

```html
<div v-bind:class="{ active: isActive }"></div>

<!-- <div class="static active"></div> -->
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

<!--
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
-->
<div v-bind:class="classObject"></div>

<!--
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
-->
<div v-bind:class="classObject"></div>
```

### Array Syntax

```html
<div v-bind:class="[activeClass, errorClass]"></div>
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```


## Binding Inline Styles

```html
<!--
data: {
  activeColor: 'red',
  fontSize: 30
}
-->
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<div v-bind:style="[baseStyles, overridingStyles]"></div>
```