# Enums

Enums are one of the few features TypeScript has which is not a type-level extension of JavaScript.

## Numeric enums

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

```ts
enum Direction {
  Up, // = 0
  Down,
  Left,
  Right,
}
```

```ts
enum UserResponse {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: UserResponse): void {
  // ...
}

respond("Princess Caroline", UserResponse.Yes);
```


## String enums

if you were debugging and had to read the runtime value of a numeric enum, the value is often opaque - it doesn't convey any useful meaning on its own, string enums allow you to give a meaningful and readable value when your code runs, independent of the name of the enum member itself.

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```


## Computed and constant members

```ts
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length,
}
```


## Union enums and enum member types

A literal enum member is a constant enum member with no initialized value, or with values that are initialized to:

- any string literal (e.g. `"foo"`, `"bar"`, `"baz"`)
- any numeric literal (e.g. `1`, `100`)
- a unary minus applied to any numeric literal (e.g. `-1`, `-100`)

When all members in an enum have literal enum values:

- enum members also become types as well
- enum types themselves effectively become a union of each enum member

```ts
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}
```

## Enums at runtime

Enums are real objects that exist at runtime.

```ts
enum E {
  X,
  Y,
  Z,
}

function f(obj: { X: number }) {
  return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.
f(E);
```


## Enums at compile time

Use `keyof typeof` to get a Type that represents all Enum keys as strings.

```ts
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}
printImportant("ERROR", "This is a message");
```


## Reverse mappings

Numeric enums members also get a reverse mapping from enum values to enum names.

```ts
enum Enum {
  A,
}

let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

String enum members do not get a reverse mapping generated at all.


## `const` enums

To avoid paying the cost of extra generated code and additional indirection when accessing enum values, it’s possible to use `const` enums. 

Const enums can only use constant enum expressions and unlike regular enums they are completely removed during compilation. Const enum members are inlined at use sites. This is possible since const enums cannot have computed members.

```ts
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];
```

in generated code will become

```ts
"use strict";
let directions = [
  0 /* Up */,
  1 /* Down */,
  2 /* Left */,
  3 /* Right */,
];
```