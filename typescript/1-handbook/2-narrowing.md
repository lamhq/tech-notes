# Narrowing

the process of refining types to more specific types than declared is called **narrowing**

```ts
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    // padding is number
    return new Array(padding + 1).join(" ") + input;
                       
  }
  // padding is string
  return padding + input;
}
```

## `typeof` type guards

JavaScript supports a `typeof` operator which can give very basic information about the type of values we have at runtime. TypeScript expects this to return a certain set of strings:

- `"string"`
- `"number"`
- `"bigint"`
- `"boolean"`
- `"symbol"`
- `"undefined"`
- `"object"`
- `"function"`

In TypeScript, checking against the value returned by `typeof` is a **type guard**. 


## Truthiness narrowing

In JavaScript, constructs like `if` first “coerce” their conditions to `boolean` to make sense of them, and then choose their branches depending on whether the result is `true` or `false`. 

These values all coerce to `false` (other values get coerced `true`):

- `0`
- `NaN`
- `""` (empty string)
- `0n` (`bigint` version of zero)
- `null`
- `undefined`


You can always coerce values to booleans by running them through the `Boolean` function, or by using the shorter **double-Boolean negation**:

```ts
// both of these result in 'true'
Boolean("hello"); // type: boolean, value: true
!!"world";        // type: true,    value: true
```


## Equality narrowing

TypeScript also uses switch statements and equality checks like `===`, `!==`, `==`, and `!=` to narrow types. 

Checking whether something `== null` actually checks whether a value is either `null` or `undefined`. The same applies to `== undefined`.


## The `in` operator narrowing

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    // (parameter) animal: Fish
    return animal.swim();
  }

  // (parameter) animal: Bird
  return animal.fly();
}
```

## `instanceof` narrowing

```ts
function logValue(x: Date | string) {
  if (x instanceof Date) {
    // (parameter) x: Date
    console.log(x.toUTCString());
  } else {
    // (parameter) x: string
    console.log(x.toUpperCase());
  }
}
```

## Using type predicates

To define a user-defined type guard, we simply need to define a function whose return type is a type predicate:

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

```ts
// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

```ts
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];

const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
```


## Discriminated unions

```ts
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;
```

```ts
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      // (parameter) shape: Circle
      return Math.PI * shape.radius ** 2;
                        
    case "square":
      // (parameter) shape: Square
      return shape.sideLength ** 2;
  }
}
```

## The `never` type

When narrowing, you can reduce the options of a union to a point where you have removed all possibilities and have nothing left. In those cases, TypeScript will use a `never` type to represent a state which shouldn't exist.