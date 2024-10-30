# Matcher

## Common Matchers

### `toBe`

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
  expect(1 + 1).not.toBe(0);
});
```

`toBe` uses `Object.is` to test exact equality. If you want to check the value of an object, use `toEqual`.


### `toEqual`

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

- `toEqual` recursively checks every field of an object or array.
- `toEqual` ignores object keys with `undefined` properties, `undefined` array items, array sparseness, or object type mismatch. To take these into account use `toStrictEqual` instead.


### `not`

You can also test for the opposite of a matcher using `not`:

```js
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

## Truthiness

- `toBeNull` matches only `null`
- `toBeUndefined` matches only `undefined`
- `toBeDefined` is the opposite of `toBeUndefined`
- `toBeTruthy` matches anything that an if statement treats as `true`
- `toBeFalsy` matches anything that an if statement treats as `false`


## Number

```js
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);       This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

- `toBeGreaterThan`
- `toBeGreaterThanOrEqual`
- `toBeLessThan`
- `toBeLessThanOrEqual`
- `toBeGreaterThan`


## String

You can check strings against regular expressions with `toMatch`:

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```


## Arrays and iterables

You can check if an array or iterable contains a particular item using `toContain`:

```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});
```


## Exceptions

If you want to test whether a particular function throws an error when it's called, use `toThrow`.

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```


## Object and Class

Checking object structure:

```ts
test('Checking object instance', () => {
  expect(object).toMatchObject({ 
    name: expect.any(String), 
    birthday: expect.any(Date) 
  });
});
```

Checking object is an instance of a class:

```js
test('Checking object structure', () => {
  const user = new User({ name: 'John' });
  expect(object).toBeInstanceOf(User);
});
```


## Matching type

```ts
items = await getData();
expect(items).toEqual(expect.any(Array));
expect(items.length).toBe(query.limit);
```
