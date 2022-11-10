# Basic

## Sample test

Create a file named `sum.test.js` that contain the test:

```js
// sum.test.js
function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Add the following section to your `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Run `yarn test` or `npm run test` and Jest will print this message:

```
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```


## Sample test file

```js
describe('my beverage', () => {
  it('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  it('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});

describe('matching cities to foods', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```