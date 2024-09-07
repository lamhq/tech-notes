# Number

## Integer

The integer limits represented by the built in number type are `Number.MAX_SAFE_INTEGER` and `Number.MIN_SAFE_INTEGER`.

```js
console.log({max: Number.MAX_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER});
// {max: 9007199254740991, min: -9007199254740991}
```

JavaScript uses double-precision floating-point format numbers as specified in IEEE 754 and can only safely represent numbers between `-(2^53 - 1)` and `2^53 - 1`.

Safe in this context refers to the ability to represent integers exactly and to correctly compare them.

For example, `Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2` will evaluate to true, which is mathematically incorrect.


## Decimal

Binary floating point numbers *do not* map correctly to Decimal numbers

```js
console.log(.1 + .2); // 0.30000000000000004
```

For true decimal math, use `big.js`. Whenever you use math for financial calculations (e.g. GST calculation, money with cents, addition etc), it is designed for:

* Perfect decimal math
* Safe out of bound integer values

```sh
yarn add big.js
yarn add --dev @types/big.js
```

```js
import { Big } from 'big.js';

export const foo = new Big('111.11111111111111111111');
export const bar = foo.plus(new Big('0.00000000000000000001'));

// To get a number:
const x: number = Number(bar.toString()); // Loses the precision
```

> Do not use this library for math used for UI / performance intensive purposes e.g charts, canvas drawing etc.


## NaN

When some number calculation is not representable by a valid number, JavaScript returns a special `NaN` value. A  classic example is imaginary numbers:

```js
console.log(Math.sqrt(-1)); // NaN
```

Note: Equality checks **don't** work on `NaN` values. Use `Number.isNaN` instead:

```js
// Don't do this
console.log(NaN === NaN); // false!!

// Do this
console.log(Number.isNaN(NaN)); // true
```


## Infinity

The outer bounds of values representable in Number are available as static `Number.MAX_VALUE` and `-Number.MAX_VALUE` values.

```js
console.log(Number.MAX_VALUE);  // 1.7976931348623157e+308
console.log(-Number.MAX_VALUE); // -1.7976931348623157e+308
```

Values outside the range where precision is changed resolve to special values `Infinity`/`-Infinity` e.g.

```js
console.log(Number.MAX_VALUE + 10**1000);  // Infinity
console.log(-Number.MAX_VALUE - 10**1000); // -Infinity
```

Infinity values also show up with arithmetic that requires it e.g.

```js
console.log( 1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
```

You can use these `Infinity` values manually or using static members of the `Number` class as shown below:

```js
console.log(Number.POSITIVE_INFINITY === Infinity);  // true
console.log(Number.NEGATIVE_INFINITY === -Infinity); // true
```

Fortunately comparison operators (`<` / `>`) work reliably on infinity values:

```js
console.log( Infinity >  1); // true
console.log(-Infinity < -1); // true
```


## Rounding numbers

Round a number to a specific number of decimal places:
```js
let num = 123.4567819;
let roundedNum = num.toFixed(6);
console.log(roundedNum); // 123.456789 will be rounded to 123.456782
```
