# `==` and `===` operator

In JavaScript, the double equals (`==`) operator is used to compare two values for equality, but it performs type coercion if the types of the two values are different. This means that if two values are not of the same type, JavaScript will try to convert one or both of them to an appropriate type before comparing them. 

The triple equals (`===`) operator is used to compare two values for equality without performing type coercion. If the types of the two values are different, the comparison will return `false`.

For example:

```javascript
console.log(5 == '5'); // true
console.log(5 === '5'); // false
```
