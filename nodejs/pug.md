## Install

```bash
yarn add pug
```

## Basic syntax

```pug
//- template.pug
p #{name}'s Pug source code!
```

```js
const pug = require('pug');

// Compile the source code
const compiledFunction = pug.compileFile('template.pug');

// Render a set of data
console.log(compiledFunction({
  name: 'Timothy'
}));
// "<p>Timothy's Pug source code!</p>"

// Render another set of data
console.log(compiledFunction({
  name: 'Forbes'
}));
// "<p>Forbes's Pug source code!</p>"

// Compile template.pug, and render a set of data
console.log(pug.renderFile('template.pug', {
  name: 'Timothy'
}));
```


## Attributes

```js
a(class='button' href='google.com') Google
// <a class="button" href="google.com">Google</a>

- var authenticated = true
body(class=authenticated ? 'authed' : 'anon')
// <body class="authed"></body>

input(
  type='checkbox'
  name='agreement'
  checked
)
// <input type="checkbox" name="agreement" checked="checked" />

- var url = 'pug-test.html';
a(href='/' + url) Link
// <a href="/pug-test.html">Link</a>

button(type='button' class=`btn btn-${btnType} btn-${btnSize}`)
// <button class="btn btn-info btn-lg" type="button"></button>

input(type='checkbox' checked=false)
// <input type="checkbox" />

a(style={color: 'red', background: 'green'})
// <a style="color:red;background:green;"></a>

- var classes = ['foo', 'bar', 'baz']
a(class=classes)
// <a class="foo bar baz"></a>

- var currentUrl = '/about'
a(class={active: currentUrl === '/about'} href='/about') About
// <a class="active" href="/about">About</a>

a.button
// <a class="button"></a>

div#foo(data-bar="foo")&attributes({'data-foo': 'bar'})
// <div id="foo" data-bar="foo" data-foo="bar"></div>
```


## Case

```pug
- var friends = 0
case friends
  when 0
    - break
  when 1
    p you have very few friends
  default
    p you have #{friends} friends
// empty

- var friends = 1
case friends
  when 0: p you have no friends
  when 1: p you have a friend
  default: p you have #{friends} friends
// <p>you have a friend</p>
```

## Code
```pug
- for (var x = 0; x < 3; x++)
  li item
// <li>item</li>
// <li>item</li>
// <li>item</li>

- var list = ["Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis"]
each item in list
  li= item
// <li>Uno</li>
// <li>Dos</li>
// <li>Tres</li>
// <li>Cuatro</li>
// <li>Cinco</li>
// <li>Seis</li>

p= 'This code is <escaped>!'
// <p>This code is &lt;escaped&gt;!</p>

p!= 'This code is <strong>not</strong> escaped!'
// <p>This code is <strong>not</strong> escaped!</p>
```