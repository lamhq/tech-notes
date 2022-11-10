# Template Syntax

## Interpolations

### Text

```html
<span>Message: {{ msg }}</span>
```

### Raw HTML

```html
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

### Attributes

```html
<div v-bind:id="dynamicId"></div>
<button v-bind:disabled="isButtonDisabled">Button</button>
```

### JavaScript Expressions

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```


## Directives

Directives are special attributes with the `v-`

```html
<a v-bind:href="url"> ... </a>
<a :href="url"> ... </a>
<a :[key]="url"> ... </a>

<a v-on:click="doSomething"> ... </a>
<a @click="doSomething"> ... </a>
<a @[event]="doSomething"> ... </a>
```

### Dynamic Arguments

```html
<!--
  it is also possible to use a JavaScript expression in a directive argument by wrapping it with square brackets
-->
<a v-bind:[attributeName]="url"> ... </a>

<!--
  you can use dynamic arguments to bind a handler to a dynamic event name
-->
<a v-on:[eventName]="doSomething"> ... </a>
```

Dynamic arguments are expected to evaluate to a string, with the exception of `null`. The special value `null` can be used to explicitly remove the binding. Any other non-string value will trigger a warning.

When using in-DOM templates (i.e., templates written directly in an HTML file), you should also avoid naming keys with uppercase characters, as browsers will coerce attribute names into lowercase.

### Modifiers

```html
<form v-on:submit.prevent="onSubmit"> ... </form>
```