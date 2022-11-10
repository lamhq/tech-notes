# Mixins

## How Does A Mixin Work?

To get started, we’ll need a class which will have the mixins applied on top of:

```ts
class Sprite {
  name = "";
  x = 0;
  y = 0;

  constructor(name: string) {
    this.name = name;
  }
}
```

Then you need a type and a factory function which returns a class expression extending the base class:

```ts
// To get started, we need a type which we'll use to extend
// other classes from. The main responsibility is to declare
// that the type being passed in is a class.

type Constructor = new (...args: any[]) => {};

// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:

function Scale<TBase extends Constructor>(Base: TBase) {
  return class Scaling extends Base {
    // Mixins may not declare private/protected properties
    // however, you can use ES2020 private fields
    _scale = 1;

    setScale(scale: number) {
      this._scale = scale;
    }

    get scale(): number {
      return this._scale;
    }
  };
}
```

With these all set up, then you can create a class which represents the base class with mixins applied:

```ts
// Compose a new class from the Sprite class,
// with the Mixin Scale applier:
const EightBitSprite = Scale(Sprite);

const flappySprite = new EightBitSprite("Bird");
flappySprite.setScale(0.8);
console.log(flappySprite.scale);
```

## Constrained Mixins

In the above form, the mixin’s have no underlying knowledge of the class which can make it hard to create the design you want.

To model this, we modify the original constructor type to accept a generic argument.

```ts
// Now we use a generic version which can apply a constraint on
// the class which this mixin is applied to
type GConstructor<T = {}> = new (...args: any[]) => T;

type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>;

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

const EightBitSprite = Jumpable(Sprite);

const flappySprite = new EightBitSprite("Bird");
flappySprite.jump();
```