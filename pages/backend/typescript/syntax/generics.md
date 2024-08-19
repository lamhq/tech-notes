# Generics

## Generic Functions

In TypeScript, **generics** are used where input types relate to the output type or where two inputs are related.

Note that the type was inferred (chosen automatically) by TypeScript, but not always.

```ts
function firstElement<Type>(arr: Type[]): Type {
  return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
```


## Generic Interfaces

```ts
interface Abc<T> {
  a: T;
}

const a : Abc<string> = { a: '123' }
```

## Generic Types

```ts
type Abc<T> = { a: T; }
type Def = Abc<number>;

const a : Abc<string> = { a: '123' }
const b : Def = { a: 111 }
```

## Generic Classes

```ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
```

## Generic Constraints

Sometimes we want to only operate on a certain subset of values, we can define a constraint using `extends` keyword to limit the kinds of types that a type parameter can accept.

```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'string'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
```

Common error when working with generic constraints:

```ts
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum };
    /*
      Type '{ length: number; }' is not assignable to type 'Type'.
      '{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.
    */
  }
}
```

The problem is that the `minimumLength` function is expected to return an object with type: `Type`, not just some object matching the constraint.
