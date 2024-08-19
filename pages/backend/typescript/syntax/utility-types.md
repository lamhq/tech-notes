# Utility Types

## `Partial<Type>`

Constructs a type with all properties of `Type` set to optional.

```ts
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```


## `Required<Type>`

The opposite of `Partial`.


## `Readonly<Type>`

Constructs a type with all properties of `Type` set to `readonly`


## `Record<Keys,Type>`

Constructs an object type whose property keys are `Keys` and whose property values are `Type`

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```


## `Pick<Type, Keys>`

Constructs a type by picking the set of properties `Keys` (string literal or union of string literals) from `Type`.

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```


## `Omit<Type, Keys>`

Constructs a type by picking all properties from `Type` and then removing `Keys` (string literal or union of string literals).

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
```


## `Exclude<Type, ExcludedUnion>`

Constructs a type by excluding from `Type` all union members that are assignable to `ExcludedUnion`.

```ts
type T0 = Exclude<"a" | "b" | "c", "a">;
// type T0 = "b" | "c"
     
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
// type T1 = "c"
     
type T2 = Exclude<string | number | (() => void), Function>;
// type T2 = string | number
```


## `Extract<Type, Union>`

Constructs a type by extracting from `Type` all union members that are assignable to `Union`.

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
// type T0 = "a"
     
type T1 = Extract<string | number | (() => void), Function>;
// type T1 = () => void
```


## `NonNullable<Type>`

Constructs a type by excluding `null` and `undefined` from `Type`.


## `Parameters<FunctionType>`

Constructs a tuple type from the types used in the parameters of a function type named `FunctionType`.

```ts
type T0 = Parameters<() => string>;
// type T0 = []
     
type T1 = Parameters<(s: string) => void>;
// type T1 = [s: string]

declare function f1(arg: { a: number; b: string }): void;
type T2 = Parameters<typeof f1>;
// type T2 = [arg: {
//   a: number;
//   b: string;
// }]
```


## `ReturnType<FunctionType>`

Constructs a type consisting of the return type of function `FunctionType`

```ts
// inside some library - return type { baz: number } is inferred but not exported
function foo(bar: string) {
  return { baz: 1 };
}

//  inside your app, if you need { baz: number }
type FooReturn = ReturnType<typeof foo>; // { baz: number }
```

To grab the sub types of function's return type:

```tsx
function foo() {
  return {
    a: 1,
    b: 2,
    subInstArr: [
      {
        c: 3,
        d: 4,
      },
    ],
  };
}

type InstType = ReturnType<typeof foo>;
type SubInstArr = InstType["subInstArr"];
type SubInstType = SubInstArr[0];

let baz: SubInstType = {
  c: 5,
  d: 6, // type checks ok!
};
```


## `ConstructorParameters<ConstructorType>`

Constructs a tuple or array type from the types of a constructor function type. 

```ts
type SomeConstructor = {
  new (s: string): string;
};

type T0 = ConstructorParameters<SomeConstructor>;
// type T0 = [s: string]
```


## `InstanceType<Type>`

InstanceType utility type allows you to extract the instance type of a constructor function or class

It’s useful when you want to infer the type of instances that can be created from a constructor or class.

In this example, `PersonInstance` represents the type of instances created from the `Person` class, which is equivalent to `{ name: string; age: number; }`:
```ts
class Person {
  constructor(public name: string, public age: number) {}
}

type PersonInstance = InstanceType<typeof Person>;

const person: PersonInstance = new Person("Alice", 30);
console.log(person.name); // "Alice"
console.log(person.age); // 30
```


## `ThisParameterType<Type>`

Extracts the type of the `this` parameter for a function type, return `unknown` if the function type has no `this` parameter.

```ts
function toHex(this: Number) {
  return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```


## `OmitThisParameter<Type>`

Removes the `this` parameter from `Type`

```ts
function toHex(this: Number) {
  return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
console.log(fiveToHex());
```


## Intrinsic String Manipulation Types

- `Uppercase<StringType>`
- `Lowercase<StringType>`
- `Capitalize<StringType>`
- `Uncapitalize<StringType>`