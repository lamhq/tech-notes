# Style Guide

Best practices for writting TypeScript code.

You don't need to remember all of these. Most of the rules can be checked by Linter.

## Interface

**Don't prefix interface name with `I`**.

> Reason: Unconventional. `lib.d.ts` defines important interfaces without an `I` (e.g. Window, Document etc).


## Null vs. Undefined

**Prefer not to use either for explicit unavailability**.

> Reason: these values are commonly used to keep a consistent structure between values. You should use *types* to denote the structure

**Bad**
```ts
let foo = { x: 123, y: undefined };
```

**Good**
```ts
let foo: { x: number, y?: number } = { x:123 };
```

**Use `undefined` in to indicate the absence of a value**. Consider returning an object that clearly indicates the validity of the value and optionally includes the value itself like `{valid:boolean, value?:Foo}` instead.

**Bad**
```ts
return null;
```
**Good**
```ts
return undefined;
```

**Use `null` where it's a part of the API or conventional**.

> Reason: It is conventional in Node.js e.g. `error` is `null` for NodeBack style callbacks.

**Bad**
```ts
cb(undefined)
```
**Good**
```ts
cb(null)
```

**Use *truthy* check for **objects** being `null` or `undefined`**

**Bad**
```ts
if (error === null)
```
**Good**
```ts
if (error)
```

**Use `== null` / `!= null` (not `===` / `!==`) to check for `null` / `undefined` on primitives**.

> Reason: `== null` works for both `null`/`undefined` but not other falsy values (like `''`, `0`, `false`) e.g.

**Bad**
```ts
if (error !== null) // does not rule out undefined
```
**Good**
```ts
if (error != null) // rules out both null and undefined
```


## Quotes

**Prefer single quotes (`'`) unless escaping**.

> Reason: More JavaScript teams do this. It's easier to type (no shift needed on most keyboards). Prettier team recommends single quotes as well.


**When you can't use double quotes, try using back ticks (\`)**.

> Reason: These generally represent the intent of complex enough strings.


## Spaces

**Use `2` spaces. Not tabs**.

> Reason: More JavaScript teams do this. Easier to look in small screen (e.g. laptop).


## Semicolons

**Use semicolons.**

> Reasons: Explicit semicolons helps language formatting tools give consistent results. Avoiding mistake for inline codes.


## Array

**Annotate arrays as `foos:Foo[]` instead of `foos:Array<Foo>`**.

> Reasons: It's easier to read. Commonly used by the community and other programming languages. Makes easier to know something is an array as the mind is trained to detect `[]`.


## Filename

Name files with `camelCase`. E.g. `accordion.tsx`, `myControl.tsx`, `utils.ts`, `map.ts` etc.

> Reason: Conventional across many JS teams.

When the file exports a component and your framework (like React) wants component to be PascalCased, use pascal case file name to match e.g. `Accordion.tsx`, `MyControl.tsx`

> Reason: Helps with consistency (little overthought required) and its what the ecosystem is doing.


## Type vs. Interface

**Use `type` by default because it supports more features**.
```
type Foo = number | { someProperty: number }
```

**Use `interface` when you want `extends` or `implements`** (e.g. in OOP programming).
```ts
interface Foo {
  foo: string;
}

interface FooBar extends Foo {
  bar: string;
}

class X implements FooBar {
  foo: string;
  bar: string;
}
```


## Reference

- [TypeScript Deep Dive Style Guide](https://basarat.gitbook.io/typescript/styleguide)
