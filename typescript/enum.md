# Enum

## Enum members also become types

```ts
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

let c: Circle = {
  // Error! Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
  kind: ShapeKind.Square,
  radius: 100,
}
```


## Convert Enum keys to strings

```ts
enum LogLevel {
  ERROR, WARN, INFO, DEBUG
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings) {
  console.log(key);
}

printImportant('ERROR');
```


## Reverse mappings

String enum members do not get a reverse mapping generated at all.

```ts
enum Enum {
  A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```