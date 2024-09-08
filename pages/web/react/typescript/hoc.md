# Higher-Order Component

## Overview

A Higher-Order Component (HOC) is a function that takes a component and returns a new component with additional props or behavior


## Declaring a HOC

In this example, we declare a HOC that return a new component with additional props from the current selected theme:

```tsx
interface Props extends WithThemeProps {
  children?: React.ReactNode;
}

export function withTheme<T extends WithThemeProps = WithThemeProps>
  (WrappedComponent: React.ComponentType<T>) {

  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithTheme = (props: Omit<T, keyof WithThemeProps>) => {
    // Fetch the props you want to inject. This could be done with context instead.
    const themeProps = useTheme();

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent {...themeProps} {...(props as T)} />;
  };

  ComponentWithTheme.displayName = `withTheme(${displayName})`;

  return ComponentWithTheme;
}
```


## Using HOC

We apply the HOC on a component:
```tsx
function MyButton({ theme, ...otherProps }) {
  // Render an the element using the theme and other props.
  return </> 
}

export default withTheme(MyButton);
```
