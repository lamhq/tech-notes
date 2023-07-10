# HOC

## `withTheme` HOC

### Declare HOC

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


### Using HOC

```tsx
class MyButton extends React.Component<Props> {
  public render() {
    // Render an the element using the theme and other props.
  }

  private someInternalMethod() {
    // The theme values are also available as props here.
  }
}

export default withTheme(MyButton);
```
