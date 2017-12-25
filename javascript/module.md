## Import/Export default

__components.js__

``` javascript
// exports a constant
const foo = 'I am foo123';
export default foo;
```

__main.js__

``` javascript
import MyDefault from './components.js';
console.log(MyDefault); // 'I am foo'
```

## Using named export

__components.js__

``` javascript
const named = 'I am named';
export { named };
```

__main.js__

``` javascript
import { named } from './components.js';
console.log(named);
```

## Import multiple members of module

__components.js__

``` javascript
const foo = 'I am foo';
const named = 'I am named';
export { named, foo };
```

__main.js__

``` javascript
import { foo, named } from './component.js';
console.log(named, foo);
```

## Using import defaut and named import together

__components.js__

``` javascript
const foo = 'I am foo';
const named = 'I am named';
export { named, foo };
export default foo;
```

__main.js__

``` javascript
import MyDefault, { named } from './component.js';
console.log(MyDefault, named);
```

## Import an entire module's contents (namespace import)

__main.js__

``` javascript
import * as Component from './component.js';
console.log(Component.named, Component.foo);
```

## Import a member with an alias

__main.js__

``` javascript
import { foo as food } from './component.js';
console.log(food); // 'I am foo'
```

## Import a module for its side effects only

Used when importing css files

__main.js__

``` javascript
import './style.css';
```

## References

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)