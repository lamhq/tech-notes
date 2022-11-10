# Function Components

```ts
// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  message: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const App = ({ message }: AppProps) => <div>{message}</div>;
```

## Notes

- `React.FC` is [discouraged](https://github.com/facebook/create-react-app/pull/8177).
- `React.VFC` and `React.VoidFunctionComponent` were [deprecated](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/59882) in React 18