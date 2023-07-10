# Typing defaultProps

You May Not Need `defaultProps`. `defaultProps` will eventually be [deprecated](https://twitter.com/hswolff/status/1133759319571345408).

The consensus is to use object default values.

```tsx
type GreetProps = { age?: number };

const Greet = ({ age = 21 }: GreetProps) => // etc
```
