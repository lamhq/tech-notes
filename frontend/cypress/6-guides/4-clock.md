# Stubs, Spies, and Clocks

## Stubs

A stub is a way to modify a function and delegate control over its behavior to you.

```ts
// create a standalone stub (generally for use in unit test)
cy.stub()

// replace obj.method() with a stubbed function
cy.stub(obj, 'method')

// force obj.method() to return "foo"
cy.stub(obj, 'method').returns('foo')

// force obj.method() when called with "bar" argument to return "foo"
cy.stub(obj, 'method').withArgs('bar').returns('foo')

// force obj.method() to return a promise which resolves to "foo"
cy.stub(obj, 'method').resolves('foo')

// force obj.method() to return a promise rejected with an error
cy.stub(obj, 'method').rejects(new Error('foo'))
```


Common Scenarios:

- You have a function that accepts a callback, and want to invoke the callback.
- Your function returns a `Promise`, and you want to automatically resolve or reject it.
- You have a function that wraps `window.location` and don't want your application to be navigated.
- You're trying to test your application's "failure path" by forcing things to fail.
- You're trying to test your application's "happy path" by forcing things to pass.
- You want to "trick" your application into thinking it's logged in or logged out.
- You're using `oauth` and want to stub login methods.


## Spies

A spy gives you the ability to "spy" on a function, by letting you capture and
then assert that the function was called with the right arguments, or that the
function was called a certain number of times, or even what the return value was
or what context the function was called with.

A spy does **not** modify the behavior of the function - it is left perfectly
intact. A spy is most useful when you are testing the contract between multiple
functions and you don't care about the side effects the real function may create
(if any).


## Clock

There are situations when it is useful to control your application's `date` and
`time` in order to override its behavior or avoid slow tests.

With `cy.clock()`` you can control:

- `Date`
- `setTimeout`
- `setInterval`

### Ticking time ahead by milliseconds

```tsx
cy.clock()
cy.visit('http://localhost:3333')
cy.get('#search').type('Acme Company')
cy.tick(1000)
```

### Restore the clock

```tsx
// restore the clock
cy.clock().then((clock) => {
  clock.restore()
})

// another way to restore the clock
cy.clock().invoke('restore')
```


## Assertions

Once you have a `stub` or a `spy` in hand, you can then create assertions about
them.

```js
const user = {
  getName: (arg) => {
    return arg
  },

  updateEmail: (arg) => {
    return arg
  },

  fail: () => {
    throw new Error('fail whale')
  },
}

// force user.getName() to return "Jane"
cy.stub(user, 'getName').returns('Jane Lane')

// spy on updateEmail but do not change its behavior
cy.spy(user, 'updateEmail')

// spy on fail but do not change its behavior
cy.spy(user, 'fail')

// invoke getName
const name = user.getName(123)

// invoke updateEmail
const email = user.updateEmail('jane@devs.com')

try {
  // invoke fail
  user.fail()
} catch (e) {}

expect(name).to.eq('Jane Lane') // true
expect(user.getName).to.be.calledOnce // true
expect(user.getName).not.to.be.calledTwice // true
expect(user.getName).to.be.calledWith(123)
expect(user.getName).to.be.calledWithExactly(123) // true
expect(user.getName).to.be.calledOn(user) // true

expect(email).to.eq('jane@devs.com') // true
expect(user.updateEmail).to.be.calledWith('jane@devs.com') // true
expect(user.updateEmail).to.have.returned('jane@devs.com') // true

expect(user.fail).to.have.thrown('Error') // true
```
