# ES6 cheatsheet

## `const`

```js
const EULER = 2.7182818284
```


## `let` vs `var`

```js
var average = 5
var average = (average + 1) / 2
average
// 3

let value = 'hello world'
let value = 'what is new'
// throws TypeError: Identifier 'value' has already been declared
```


## Arrow Function

```js
setTimeout(() ={
  console.log('delayed')
}, 1000)
```

Equivalent with Anonymous Function:

```js
setTimeout(function () {
  console.log('delayed')
}.bind(this), 1000)
```


## Destructuring

```js
let [a, b, c, d] = [1, 2, 3, 4];

let luke = {  occupation: 'jedi', father: 'anakin' }
let {occupation, father} = luke
console.log(occupation, father)
```


## Spread Operator

```js
function logger(...args) {
  console.log('%s arguments', args.length)
  args.forEach(console.log)
  // arg[0], arg[1], arg[2]
}

let arr = [1, 2, 3]
let arr2 = [...arr, 4, 5, 6]

const [ cat, dog, ...fish ] = ['schroedinger',  'Laika', 'Nemo', 'Dori']
fish // -> ['Nemo', 'Dori']

{a, b, ...rest} = { a:1, b:2, c:3, d:4 }
```

## New Scoped Functions

```js
{
  let cue = 'Luke, I am your father' ... console.log(cue)
}
```

Equivalent with Immediately Invoked Function Expressions (IIFE):
 
```js
(function () {
  var cue = 'Luke, I am your father'
  console.log(cue) // 'Luke, I am –
}())
```


## String Interpolation (Template Literals)

```js
const name = 'Tiger'
const age = 13
console.log(`My cat is named ${name} and is ${age} years old.`)
```

We can preserve newlines:

```js
let text = (`cat
dog
nickelodeon`
)
```


## Default Params

```js
function howAreYou (answer = 'ok') {
  console.log(answer) // probably 'ok'
}
```


## Object Notation Novelties

```js
// Computed properties
let key = new Date().getTime()
let obj = {  [key]: “value” }
obj
// { '1459958882881': 'value' }

// Object literals
balloon = { color, size };
// Same as
balloon = {
  color: color,
  size: size
}

// Better method notations
obj = {
  foo (a, b) { ... },
  bar (x, y) { ... }
}
```


## Promises

```js
new Promise((resolve, reject) => {
  request.get(url, (error, response, body) => {
    if (body) {
      resolve(JSON.parse(body));
    } else {
      resolve({});
    }
  })
}).then(() => { ... })
.catch((err) => throw err)

// Parallelize tasks
Promise.all([
   promise1, promise2, promise3
]).then(() => {
   // all tasks are finished
})
```


## Classes, Inheritance, Setters, Getters

```js
class Rectangle extends Shape {
  constructor(id, x, y, w, h) {
    super(id, x, y)
    this.width = w
    this.height = h
  }

  // Getter and setter
  set width(w) {
    this._width = w
  }

  get width() {
    return this._width
  }
}

class Circle extends Shape {
  constructor(id, x, y, radius) {
    super(id, x, y)
    this.radius = radius
  }

  do_a(x) {
    let a = 12;
    super.do_a(x + a);
  }

  static do_b() {
    ...
  }
}

Circle.do_b()
```


## Binary, Octal and Hex Notation

```js
0b1001011101 // 605 
0o6745 // 3557
0x2f50a // 193802
```


## New Types

Symbols, Maps, WeakMaps and Sets
