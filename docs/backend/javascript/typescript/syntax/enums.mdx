# Enums

Enums are one of the few features TypeScript has which is not a type-level extension of JavaScript.

## Numeric enums

```ts
enum UserResponse {
  No = 0,
  Yes = 1,
}

const message: UserResponse = UserResponse.Yes;
```

The first member in the enum without an initializer is assigned the value `0`. The next value will be the previous enum member's value plus `1`:
```ts
enum Direction {
  Up, // = 0
  Down,
  Left,
  Right,
}
```


## String enums

Numeric enums often result in opaque values during debugging, offering no meaningful insight.

String enums provide readable and meaningful values at runtime, independent of the enum member names.

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
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

To convert an Enum type to a union string type, use `keyof typeof`:

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


## `const` enums

Regular enums generate additional code for runtime lookups. If you want to avoid this overhead, use `const` enums.

`const` enums are inlined during compilation, so there's no runtime lookup or additional function calls.

To Define a `const` Enum, use the `const` modifier with your enum:
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

In generated code will become:

```ts
"use strict";
let directions = [
  0 /* Up */,
  1 /* Down */,
  2 /* Left */,
  3 /* Right */,
];
```