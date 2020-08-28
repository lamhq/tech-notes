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

### Mocking default exported value of a node module
```js
// mock default exported function from twilio module
const createOtp = jest.fn();
const checkOtp = jest.fn();
jest.mock('twilio', () => ({
  __esModule: true, // this property makes it work
  default: () => ({
    verify: {
      services: () => ({
        verifications: { create: createOtp },
        verificationChecks: { create: checkOtp },
      }),
    },
  }),
}));

describe('requestOtp', () => {
  let service: TwilioService;

  it('should return true', async () => {
    createOtp.mockResolvedValue({ status: 'pending' });
    await expect(service.requestOtp(phone)).resolves.toBe(true);
    expect(createOtp).toHaveBeenCalledWith({ to: phone, channel: 'sms' });
  });

  it('should return false', async () => {
    createOtp.mockRejectedValue('some errors');
    await expect(service.requestOtp(phone)).resolves.toBe(false);
    expect(createOtp).toHaveBeenCalledWith({ to: phone, channel: 'sms' });
  });
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

Manual mocks are defined by writing a module in a `__mocks__/` subdirectory immediately adjacent to the module.

For example, to mock a module called `user` in the `models` directory, create a file called `user.js` and put it in the `models/__mocks__` directory.


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


## Timer mocks

### Setup

Mock `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval` functions

```js
// timerGame.js
'use strict';

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
```

```js
// __tests__/timerGame-test.js
'use strict';

jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
  const timerGame = require('../timerGame');
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
```

### Fast-forward time

```js
jest.useFakeTimers();

test('calls the callback after 1 second', () => {
  const timerGame = require('../timerGame');
  const callback = jest.fn();

  timerGame(callback);

  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.runAllTimers();

  // Now our callback should have been called!
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});
```

### Advance Timers by Time

```js
jest.useFakeTimers();

test('calls the callback after 1 second', () => {
  const timerGame = require('../timerGame');
  const callback = jest.fn();

  timerGame(callback);

  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.advanceTimersByTime(1000);

  // Now our callback should have been called!
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});
```
