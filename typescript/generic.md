# Generic

## Basic example

```ts
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");  // type of output will be 'string'
let output = identity("myString");  // type of output will be 'string'
```


## Array of generic type

```ts
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}
```


## Type of Generic function

```ts
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
let myIdentity: {<T>(arg: T): T} = identity;
```

```ts
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

```ts
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```


## Generic class

When working with classes, static members can not use the class's type parameter.

```ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```


## Generic Constraints

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property
  return arg;
}

loggingIdentity(3);  // Error, number doesn't have a .length property
loggingIdentity({ length: 10, value: 3 });  // Ok
```


## Generics Class Types

```ts
function create<T>(c: {new(): T; }): T {
  return new c();
}
```

```ts
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<T extends Animal>(c: new () => T): T {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
```