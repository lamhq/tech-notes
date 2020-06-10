# Mocking

## The Mock function

### Create a mock function

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


## Automatic Mocks

### Mocking node modules

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


### Mocking user modules

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


## Manual Mocks

### Mocking user modules

Manual mocks are defined by writing a module in a `__mocks__/` subdirectory immediately adjacent to the module. For example, to mock a module called `user` in the `models` directory, create a file called `user.js` and put it in the `models/__mocks__` directory.


### Mocking Node modules

If the module you are mocking is a Node module (e.g.: `lodash`), the mock should be placed in the `__mocks__` directory adjacent to `node_modules` (unless you configured [`roots`](Configuration.md#roots-arraystring) to point to a folder other than the project root) and will be **automatically** mocked. There's no need to explicitly call `jest.mock('module_name')`.

Scoped modules can be mocked by creating a file in a directory structure that matches the name of the scoped module. For example, to mock a scoped module called `@scope/project-name`, create a file at `__mocks__/@scope/project-name.js`, creating the `@scope/` directory accordingly.

If we want to mock Node's core modules (e.g.: `fs` or `path`), then explicitly calling e.g. `jest.mock('path')` is **required**, because core Node modules are not mocked by default.

```
.
├── config
├── __mocks__
│   └── fs.js
├── models
│   ├── __mocks__
│   │   └── user.js
│   └── user.js
├── node_modules
└── views
```

When a manual mock exists for a given module, Jest's module system will use that module when explicitly calling `jest.mock('moduleName')`. However, when `automock` is set to `true`, the manual mock implementation will be used instead of the automatically created mock, even if `jest.mock('moduleName')` is not called. To opt out of this behavior you will need to explicitly call `jest.unmock('moduleName')` in tests that should use the actual module implementation.

> Note: In order to mock properly, Jest needs `jest.mock('moduleName')` to be in the same scope as the `require/import` statement.
