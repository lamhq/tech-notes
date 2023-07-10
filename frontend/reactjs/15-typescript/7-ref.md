# Ref

## createRef

```tsx
import { createRef, PureComponent } from "react";

class CssThemeProvider extends PureComponent<Props> {
  private rootRef = createRef<HTMLDivElement>(); // like this
  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

## forwardRef

```tsx
import { forwardRef, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  type: "submit" | "button";
}
export type Ref = HTMLButtonElement;

export const FancyButton = forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyClassName" type={props.type}>
    {props.children}
  </button>
));
```


## Generic forwardRefs

```tsx
type ClickableListProps<T> = {
  items: T[];
  onSelect: (item: T) => void;
  mRef?: React.Ref<HTMLUListElement> | null;
};

export function ClickableList<T>(props: ClickableListProps<T>) {
  return (
    <ul ref={props.mRef}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}
```
