# Form Input Bindings

```html
<!-- Text -->
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>

<!-- Multiline text -->
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>

<!-- Checkbox -->
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>

<!-- Multiple checkboxes -->
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>

<!-- Radio -->
<input type="radio" id="one" value="One" v-model="picked">
<label for="one">One</label>
<br>
<input type="radio" id="two" value="Two" v-model="picked">
<label for="two">Two</label>
<br>
<span>Picked: {{ picked }}</span>

<!-- Select -->
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<span>Selected: {{ selected }}</span>
```


## Value Bindings

The `v-model` binding values are usually static strings (or booleans for checkboxes). Using `v-bind` allows us to bind the input value to non-string values.

```html
<!--
vm.toggle === 'yes'
vm.toggle === 'no'
-->
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>

<select v-model="selected">
  <!-- inline object literal -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
<!--
// when selected:
typeof vm.selected // => 'object'
vm.selected.number // => 123
-->
```

## Modifiers

```html
<!-- typecast as a Number automatically -->
<input v-model.number="age" type="number">

<!-- trim whitespace automatically, -->
<input v-model.trim="msg">
```