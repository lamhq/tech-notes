# Mocking

## Mock Functions

Mock functions allow you to test the links between code by:
- erasing the actual implementation of a function, capturing calls to the function
- capturing instances of constructor functions when instantiated with new
- allowing test-time configuration of return values


Let's imagine we're testing an implementation of a function `forEach`, which invokes a callback for each item in a supplied array.

```js
export function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```

To test this function, we can use a mock function for the callback, and inspect the mock's state to ensure the callback is invoked as expected.

```js
const forEach = require('./forEach');

const mockCallback = jest.fn(x => 42 + x);

test('forEach mock function', () => {
  forEach([0, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});
```

## `.mock` property

All mock functions have a special `.mock` property, which is where data about how the function has been called and what the function returned is kept. 

```js
// The function was called exactly once
expect(someMockFunction.mock.calls).toHaveLength(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe('return value');

// The function was called with a certain `this` context: the `element` object.
expect(someMockFunction.mock.contexts[0]).toBe(element);

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toBe('test');

// The first argument of the last call to the function was 'test'
expect(someMockFunction.mock.lastCall[0]).toBe('test');
```


## Mock Return Values

```js
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```


## Mocking Modules

Mock the `axios` module:

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


## Mocking Partials

Subsets of a module can be mocked and the rest of the module can keep their actual implementation:

In this example, we'll mock the default export and named export `foo` from the module `foo-bar-baz.js`:

```js
// foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

```js
//test.js
import defaultExport, {bar, foo} from '../foo-bar-baz';

jest.mock('../foo-bar-baz', () => {
  const originalModule = jest.requireActual('../foo-bar-baz');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    foo: 'mocked foo',
  };
});

test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});
```


## Mock Implementations

There are cases where it's useful to go beyond the ability to specify return values and full-on replace the implementation of a mock function.

```js
const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true
```

Mock the implementation of a mock function that is created from another module:

```js
// foo.js
module.exports = function () {
  // some implementation;
};
```

```js
// test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
```

Produce different results from multiple function calls:

```js
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```


## Mock return `this`

```js
const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// is the same as

const otherObj = {
  myMethod: jest.fn(function () {
    return this;
  }),
};
```


## Mock names

You can optionally provide a name for your mock functions, which will be displayed instead of `jest.fn()` in the test error output.

```js
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');
```


## Matchers for mock function

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


## Timer mocks

The native timer functions (i.e., `setTimeout()`, `setInterval()`, `clearTimeout()`, `clearInterval()`) are less than ideal for a testing environment since they depend on real time to elapse.


### Enable Fake Timers

```tsx
// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers()
})
```

### Restore the timers after your test runs

```tsx
// Running all pending timers and switching to real timers using Jest
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})
```

### Using fake timers

The function `timerGame` call the callback after 1 second:

```js
// timerGame.js
function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
```

Fast-forward until all timers have been executed:

```js
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

### Run only Pending Timers

There are also scenarios where you might have a recursive timer – that is a timer that sets a new timer in its own callback. For these, running all the timers would be an endless loop, throwing the following error: "Aborting after running 100000 timers, assuming an infinite loop!"

If that is your case, using `jest.runOnlyPendingTimers()` will solve the problem:

```js
// infiniteTimerGame.js
function infiniteTimerGame(callback) {
  console.log('Ready....go!');

  setTimeout(() => {
    console.log("Time's up! 10 seconds before the next game starts...");
    callback && callback();

    // Schedule the next game in 10 seconds
    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
}

module.exports = infiniteTimerGame;
```

```js
// __tests__/infiniteTimerGame-test.js
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('infiniteTimerGame', () => {
  test('schedules a 10-second timer after 1 second', () => {
    const infiniteTimerGame = require('../infiniteTimerGame');
    const callback = jest.fn();

    infiniteTimerGame(callback);

    // At this point in time, there should have been a single call to
    // setTimeout to schedule the end of the game in 1 second.
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    // Fast forward and exhaust only currently pending timers
    // (but not any new timers that get created during that process)
    jest.runOnlyPendingTimers();

    // At this point, our 1-second timer should have fired its callback
    expect(callback).toBeCalled();

    // And it should have created a new timer to start the game over in
    // 10 seconds
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});
```


## Mock class object

```ts
import { mock } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  const appService = mock<AppService>();
  appService.getHello.mockReturnValue('Hello World!');

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
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


## Automatic Mocks

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

### Mocking exported functions of a node module

```ts
import { hash } from 'bcrypt';

const mHash = hash as jest.MockedFunction<typeof hash>;
mHash.mockImplementation(() => Promise.resolve('hashed'));
expect(hash).toHaveBeenCalledWith('1234', 9);
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
