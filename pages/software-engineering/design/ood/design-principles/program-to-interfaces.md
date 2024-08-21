# Program to interfaces

## Overview

***Program to an interface, not an implementation***.

This design principle encourages writting code that rely on abstractions (interfaces or abstract classes) rather than implementations (concrete classes).

An example of programming to implementation is, when you use the `new` operator you are certainly instantiating a concrete class, so that's an implementation.

Let's say your code depends on a class:
- When that class changes, you need to review every change (methods and attributes) to see if you're referencing them in your code; then, possibly, a refactor is required.
- You're forced to use instances of that class or its subclasses in your code, which reduces flexibility


## Benefits

**Clearer Contracts**: Interfaces define clear contracts for what are expected, making the code more understandable and self-documenting.

**Maintainability**: Code that depends on interfaces is generally easier to maintain. Changes in one part of the system are less likely to affect other parts.

**Testability**: Interfaces make it easier to write unit tests. You can create mock implementations of the interface to test the function in isolation.

**Decoupling**: By depending on an interface, the function is decoupled from the specific implementation. This reduces dependencies and makes the code more modular.


## How to do?

When you want to set up collaboration between objects:
1. Determine what exactly one object needs from the other: which methods does it execute?
2. Describe these methods in a new interface or abstract class.
3. Make the class that is a dependency implement this interface.
4. Now make the second class dependent on this interface rather than on the concrete class.


## Use cases

Use interfaces when you want to achieve loose coupling between modules or systems. This happens when you want to devide your system in to isolated modules or your code relies on external libraries.


## Example

We have a function `makePayment` that process payments from users, it need a payment processor to work:

```ts
interface PaymentProcessor {
  processPayment(amount: number): void;
}

function makePayment(processor: PaymentProcessor, amount: number): void {
  processor.processPayment(amount);
}
```

There can be many concrete implementations of the `PaymentProcessor` interface, but the developer working on the `makePayment` function only cares about the methods from the interface.
```tsx
class PayPalProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    // ...
  }

  // other attributes/methods ...
}

class StripeProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    // ...
  }

  // other attributes/methods ...
}

// Usage
const paypalProcessor = new PayPalProcessor();
const stripeProcessor = new StripeProcessor();

makePayment(paypalProcessor, 100);
makePayment(stripeProcessor, 100);
```
