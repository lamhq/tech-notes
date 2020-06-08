# Mocking

## Mock function

### Basic

```js
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```

```js
const mockFunc = jest.fn(x => 42 + x);
forEach([0, 1, 2], mockFunc);

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


### Tracking the `this` instance

```js
const myMock = jest.fn();

const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();

console.log(myMock.mock.instances);
// > [ <a>, <b> ]
```


### Mock Function's Return Values

```js
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```


### Mock Function's Implementations

```js
const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
```

```js
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```


### Provide a name for your mock functions

```js
const myMockFn = jest
  .fn()
  .mockName('add42');
```


## Mocking Modules

```js
// users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```

```js
// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
```


### Mock Module's Implementations

```js
// foo.js
module.exports = function () {
  // some implementation;
};

// test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
```