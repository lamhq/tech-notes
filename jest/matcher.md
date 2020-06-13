# Matcher

## Common Matchers

`toBe` uses `Object.is` to test exact equality.

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
  expect(1 + 1).not.toBe(0);
});
```

If you want to check the value of an object, use `toEqual`:

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

- `toBeNull` matches only `null`
- `toBeUndefined` matches only `undefined`
- `toBeDefined` is the opposite of `toBeUndefined`
- `toBeTruthy` matches anything that an if statement treats as `true`
- `toBeFalsy` matches anything that an if statement treats as `false`


## Numbers

- `toBeGreaterThan`
- `toBeGreaterThanOrEqual`
- `toBeLessThan`
- `toBeLessThanOrEqual`
- `toBeGreaterThan`


## Strings

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```


## Arrays and iterables

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


## Mock function

```js
const mockFunc = jest.fn(x => 42 + x);
forEach([0, 1, 2], mockFunc);

// The mock function was not called
expect(mockFunc).not.toBeCalled();

// The mock function was called at least once
expect(mockFunc).toHaveBeenCalled();

// The mock function was called 2 times
expect(mockFunc).toHaveBeenCalledTimes(2);

// The mock function was called at least once with the specified args
expect(mockFunc).toHaveBeenCalledWith(0);

// The last call to the mock function was called with the specified args
expect(mockFunc).toHaveBeenNthCalledWith(2, 1);

// The last call to the mock function was called with the specified args
expect(mockFunc).toHaveBeenLastCalledWith(2);

// The mock function returned a specific value
expect(mockFunc).toHaveReturnedWith(42);

// The last call of mock function returned a specific value
expect(mockFunc).toHaveLastReturnedWith(43);
```