# Mixins

## Overview

Mixins are a design pattern that allows you to compose behaviors from multiple source objects into a new object.

Essentially, you can combine multiple classes to form a new class with a unique set of functionalities.

It's a way of reusing features from different classes to create a more specialized class.

Suppose you have a base class called `Animal` with common properties and methods for all animals. You want to add logging functionality to track when an animal is created. You can create a mixin like this:
```ts
// The class which will have the mixins applied on top of
class Animal {
  constructor(public name: string) { }
}

// declare that the type being passed in is a class.
type Constructor = new (...args: any[]) => {};

// Mixin for logging
function Loggable<T extends Constructor>(Base: T) {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
      console.log(`Created ${this.name}`);
    }
  };
}

// Usage
const LoggedDog = Loggable(Animal);
const dog = new LoggedDog('Buddy'); // Logs: "Created Buddy"
```


## Constrained Mixins

In the above form, the mixin's have no knowledge of the underlying class, which can make it hard to create the design you want.

You can apply a constraint on the class which this mixin is applied to. To do that, we modify the original constructor type to accept a generic argument.

In this example, we require the underlying class to have a method `setPos(x, y)`:
```ts
// Now we use a generic version which can apply a constraint on
// the class which this mixin is applied to
type ConstrainedConstructor<T = {}> = new (...args: any[]) => T;

type Positionable = ConstrainedConstructor<{ setPos: (x: number, y: number) => void }>;

// Mixin setup
function Jumpable<TBase extends Positionable>(Base: TBase) {
  return class Jumpable extends Base {
    jump() {
      // This mixin will only work if it is passed a base
      // class which has setPos defined because of the
      // Positionable constraint.
      this.setPos(0, 20);
    }
  };
}

// Usage
const EightBitSprite = Jumpable(Sprite);
const flappySprite = new EightBitSprite("Bird");
flappySprite.jump();
```
