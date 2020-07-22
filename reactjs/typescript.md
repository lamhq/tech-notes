# Typescript for React

## Functional Components

```tsx
interface MyComponentProps {
  userName: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ userName, children }) => (
  <div>
    <span>{`Hello, ${userName}`}</span>
    {children}
  </div>
)
```


## Class Components

```tsx
interface MyComponentProps {
  userName: string
  age: number
  isActive: boolean
}

type MyComponentState = {
  isLoading: bool
}

class MyComponent extends React.Component<MyComponentProps, MyComponentState> {
  static defaultProps = {
    isLoading: false
  }

  constructor(props: MyComponentProps): {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
```


## Events

```tsx
import React, { Component, MouseEvent } from 'react';

export class Button extends Component {
  handleClick(event: MouseEvent): void {
    event.preventDefault();
    alert(event.currentTarget.tagName); // alerts BUTTON
  }

  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({text: e.currentTarget.value})
  }

  render() {
    return <button onClick={this.handleClick}>
      {this.props.children}
    </button>
  }
}
```

### Supported events

- AnimationEvent
- [ChangeEvent](https://developer.mozilla.org/en-US/docs/Web/API/ChangeEvent)
- ClipboardEvent
- CompositionEvent
- DragEvent
- [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent)
- FormEvent
- [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
- [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
- PointerEvent
- [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)
- TransitionEvent
- WheelEvent
- SyntheticEvent (all other events)


### Restrictive Event Handling

If you want to restrict your event handlers to specific elements, you can use a generic to be more specific:

```tsx
import React, { Component, MouseEvent } from 'react';

export class Button extends Component {
  /*
   Here we restrict all handleClicks to be exclusively on
   HTMLButton Elements
  */
  handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    alert(event.currentTarget.tagName); // alerts BUTTON
  }

  /*
    Generics support union types. This event handler works on
    HTMLButtonElement and HTMLAnchorElement (links).
  */
  handleAnotherClick(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    event.preventDefault();
    alert('Yeah!');
  }

  render() {
    return <button onClick={this.handleClick}>
      {this.props.children}
    </button>
  }
}
```

### InputEvent

InputEvent (SyntheticInputEvent respectively) is not supported by TypeScript typings. You can import SyntheticEvent from the React typings to get at least some type safety.

```tsx
import React, { Component, SyntheticEvent } from 'react';

export class Input extends Component {

  handleInput(event: SyntheticEvent) {
    event.preventDefault();
    // ...
  }

  render() {
    return <>
      <input type="text" onInput={this.handleInput}/>
    </>
  }
}
```


## Prop Types

Prop Types, together with TypeScript provides a full, end-to-end type-checking experience: Compiler and run-time.

```tsx
import PropTypes, { InferProps } from "prop-types";

export function Article({
  title,
  price,
  children
}: InferProps<typeof Article.propTypes>) {
  return (
    <div className="article">
      <h1>{title}</h1>
      <span>Priced at (incl VAT): {price * 1.2}</span>
      <div className="list">{children}</div>
    </div>
  );
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
```


## Hooks

### useState

```tsx
type User = {
  email: string;
  id: string;
}

const [user, setUser] = useState<User | null>(null);
```


### useEffect

```tsx
useEffect(() => {
  const handler = () => {
    document.title = window.width;
  }
  window.addEventListener('resize', handler);

  return () => {
    window.removeEventListener('resize', handler);
  }
})
```


### useContext

```tsx
import React from 'react';

// create context
export interface ILanguageContext {
  lang: string;
}
const LanguageContext: React.Context<ILanguageContext> = React.createContext<ILanguageContext>({ lang: 'en' });

const Display = () => {
  const { lang } = React.useContext<ILanguageContext>(LanguageContext);
  return <p>Your selected language: {lang}</p>;
}
```


### useRef

```tsx
function TextInputWithFocusButton() {
  // initialise with null, but tell TypeScript we are looking for an HTMLInputElement
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    // strict null checks need us to check if inputEl and current exist.
    // but once current exists, it is of type HTMLInputElement, thus it
    // has the method focus! ✅
    if(inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };
  return (
    <>
      { /* in addition, inputEl only can be used with input elements. Yay! */ }
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```


### useMemo

Let’s say you have computation heavy methods, and only want to run them when their parameters change, not every time the component updates. `useMemo` returns a memoized result, and executes the callback function only when parameters change.

```tsx
/**
 *  returns the occurence of if each shade of the
 *  red color component. Needs to browse through every pixel
 *  of an image for that.
 */
function getHistogram(image: ImageData): number[] {
  // details not really necessary for us right now 😎
  ...
  return histogram;
}

function Histogram() {
  ...
  /*
   * We don't want to run this method all the time, that's why we save
   * the histogram and only update it if imageData (from a state or somewhere)
   * changes.
   *
   * If you provide correct return types for your function or type inference is
   * strong enough, your memoized value has the same type.
   * In that case, our histogram is an array of numbers
   */
  const histogram = useMemo(() => getHistogram(imageData), [imageData]);
}
```


### useCallback

`useCallback` is very similar to `useMemo`, but it returns a callback function, not a value. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. `shouldComponentUpdate`).

`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

```tsx
const memoCallback = useCallback((a: number) => {
  // doSomething
}, [a]);
```


### useReducer

```tsx
type StateType = {
  count: number
}

type ActionType = {
  type: 'reset' | 'decrement' | 'increment'
}

function reducer(state: StateType, action: ActionType): StateType {
  ...
}

function Counter({ initialCount = 0 }) {
  const [state, dispatch] = useReducer(reducer, { count: initialCount });
  ...
}
```

## Inline Styles

```tsx
const h1Styles: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  position: 'absolute',
  right: 0,
  bottom: '2rem',
  padding: '0.5rem',
  fontFamily: 'sans-serif',
  fontSize: '1.5rem',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
};

export function Heading({ title } : { title: string} ) {
  return <h1 style={h1Styles}>{title}</h1>;
}
```

## Styled Components

```tsx
type FlexProps = {
  direction?: 'row' | 'column',
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${props => props.direction};
`;

// use it like that:
const el = <Flex direction="row"></Flex>
```


## React DOM element

```tsx
interface Props {
  button: React.ReactElement<HTMLButtonElement>
}
export default ButtonComponent extends React.PureComponent<Props> { }
<ButtonComponent button={<button>Click me</button>} />
```


## Types or Interfaces

Always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions.

Consider using `type` for your React Component Props and State, because it is more constrained.


## Useful React Prop Type Examples

```ts
export declare interface AppProps {
  children1: JSX.Element; // bad, doesnt account for arrays
  children2: JSX.Element | JSX.Element[]; // meh, doesn't accept strings
  children3: React.ReactChildren; // despite the name, not at all an appropriate type; it is a utility
  children4: React.ReactChild[]; // better
  children: React.ReactNode; // best, accepts everything
  functionChildren: (name: string) => React.ReactNode; // recommended function as a child render prop type
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  props: Props & React.PropsWithoutRef<JSX.IntrinsicElements["button"]>; // to impersonate all the props of a button element without its ref
}
```

## Interface for renderable

React can render a few things like `JSX` or `string`. These are all consolidated into the type `React.ReactNode` so use it for when you want to accept renderables e.g.

```tsx
type Props = {
  header: React.ReactNode;
  body: React.ReactNode;
}
class MyComponent extends React.Component<Props, {}> {
  render() {
    return <div>
      {this.props.header}
      {this.props.body}
    </div>;
  }
}

<MyComponent header={<h1>Header</h1>} body={<i>body</i>} />
```

## Accept an instance of a Component

The react type definitions provide `React.ReactElement<T>` to allow you to annotate the result of a `<T/>` class component instantiation. e.g.

```tsx
class MyAwesomeComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

const foo: React.ReactElement<MyAwesomeComponent> = <MyAwesomeComponent />; // Okay
const bar: React.ReactElement<MyAwesomeComponent> = <NotMyAwesomeComponent />; // Error!
```

## The Types I need weren't exported!

### Grabbing the Prop types of a component

```ts
import { Button } from "library"; // but doesn't export ButtonProps! oh no!
type ButtonProps = React.ComponentProps<typeof Button>; // no problem! grab your own!
type AlertButtonProps = Omit<ButtonProps, "onClick">; // modify

const AlertButton: React.FC<AlertButtonProps> = (props) => (
  <Button onClick={() => alert("hello")} {...props} />
);
```

You may also use `ComponentPropsWithoutRef` (instead of `ComponentProps`) and `ComponentPropsWithRef` (if your component specifically forwards refs)


### Grabbing the return type of a function

```ts
function foo(bar: string) {
  return { baz: 1 };
}

//  inside your app, if you need { baz: number }
type FooReturn = ReturnType<typeof foo>; // { baz: number }
```

