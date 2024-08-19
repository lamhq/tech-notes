# JSX

JSX is an embeddable XML-like syntax. It is meant to be transformed into valid JavaScript, though the semantics of that transformation are implementation-specific

## Basic usage

In order to use JSX you must do two things.

1. Name your files with a `.tsx` extension
1. Enable the `jsx` option

TypeScript ships with three JSX modes: 
- `preserve`: keep the JSX as part of the output to be further consumed by another transform step (e.g. `Babel`).
- `react`: emit React.createElement, the output will have a `.js` file extension.
- `react-native`: is the equivalent of `preserve` in that it keeps all JSX, but the output will instead have a `.js` file extension.


## The `as` operator

TypeScript disallows angle bracket type assertions in `.tsx` files, an alternate type assertion operator should be used: `as`

```ts
var foo = bar as foo;
```