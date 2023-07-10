# Typing Component Props

## Basic Prop Types Examples

```ts
type AppProps = {
  message: string;

  /** array of a type! */
  names: string[];

  /** string literals to specify exact string values, with a union type to join them together */
  status: "waiting" | "success";
  
  /** an object with any number of properties (PREFERRED) */
  obj3: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  
  /** any object as long as you dont use its properties (NOT COMMON but useful as placeholder) */
  obj: object;
  obj2: {}; // almost the same as `object`, exactly the same as `Object`

  /** a dict object with any number of properties of the same type */
  dict: Record<string, MyTypeHere>;
  
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** function type syntax that takes an event (VERY COMMON) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};
```


## Useful React Prop Type Examples

```ts
export declare interface AppProps {
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
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>;
}
```


## Types or Interfaces?

TL;DR: use **Interface** until You Need **Type**

- always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions, as this allows a consumer to extend them via declaration merging if some definitions are missing.
- consider using `type` for your React Component Props and State, for consistency and because it is more constrained.

Read more [here](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#more-advice).
