# Props

## Snippets

```ts
export type AppProps = {
  // best, accepts everything (see edge case below)
  children: React.ReactNode;
  
  // to pass through style props
  style?: React.CSSProperties;
  
  // form events! the generic parameter is the type of event.target
  onChange?: React.FormEventHandler<HTMLInputElement>;
  
  // more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  // to impersonate all the props of a button element and explicitly not forwarding its ref
  props: Props & React.ComponentPropsWithoutRef<"button">;
  
  // to impersonate all the props of MyButtonForwardedRef and explicitly forwarding its ref
  props2: Props & 
    React.ComponentPropsWithRef<MyButtonWithForwardRef>;

  /** function type syntax that takes an event (VERY COMMON) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;

};
```


## Getting component's prop type

`React.ComponentPropsWithRef` is a utility type provided by React. It extracts the props of a given component type and includes the `ref` attribute.

You may also use `React.ComponentProps` and `ComponentPropsWithoutRef`.

Extracting props for a native HTML element:
```tsx
type ButtonProps = React.ComponentPropsWithRef<"button">;

const Button = ({ children, onClick, type }: ButtonProps) => { ... }
```

Declare a component that use the prop:
```tsx
const MyButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button ref={ref} {...props} />
));
```
