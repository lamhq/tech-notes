# Typescript for React

## Functional Components

```tsx
interface MyComponentProps {
  userName: string
  age: number
  isActive: boolean
}

export const MyComponent = ({
  userName,
  age,
  isActive,
}: MyComponentProps) => (
  <div>
    <span>{`Hello, ${userName}`}</span>
  </div>
)

export const MyComponent: React.FC<MyComponentProps> = ({
  userName,
  age,
  isActive,
}) => (
  <div>
    <span>{`Hello, ${userName}`}</span>
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

class MyComponent extends React.Component<MyComponentProps> { }
```

```tsx
interface Props {}

interface State {
  isLoading: boolean
}

class MyClassComponent extends React.PureComponent<Props, State> {
  constructor(props: Props): {
    super(props);
    this.state = {
      isLoading: false,
    }
  }
}
```


## Common React Props

### Inline Styles

```tsx
interface Props {
  style: React.CSSProperties;
}
class InlineStyledComponent extends React.PureComponent<Props> { }

render() {
  return <InlineStyledComponent style={{ backgroundColor: '#f2f2f2' }} />
}
```

### Styled Components

```tsx
interface StyledProps {
  className?: string
}
class SomeComponent extends React.PureComponent<StyledProps> { }

// AnotherComponent.tsx
const SomeComponentStyled = styled(SomeComponent)`
  background-color: #f2f2f2;
`
<SomeComponentStyled />
```

### React DOM element

```tsx
interface Props {
  button: React.ReactElement<HTMLButtonElement>
}
export default ButtonComponent extends React.PureComponent<Props> { }
<ButtonComponent button={<button>Click me</button>} />
```


### Children

```tsx
interface Props {
  children: React.ReactNode
}
export default ComponentWithChildren extends React.PureComponent<Props> { }

<ComponentWithChildren><div>Some content</div></ComponentWithChildren>
```

if you type it as `JSX.Element` (abstraction of `React.ReactElement<any>`) or as `React.ReactElement<some-type>` it might work as well, since `React.ReactNode` also abstracts `React.ReactElement<any>`.


```tsx
interface TextProps {
  children: string
}
const Text = ({ children }: TextProps) => <span>{children}</span>
interface Props {
  children: React.ReactElement<Text>
}
export default class Modal extends React.PureComponent<Props> { ... }

// Correct usage
<Modal><Text>Some content</Text></Modal>
// Wrong usage
<Modal><Text>{true}</Text></Modal>
```


## Functions

```ts
interface Props {
  sum: (firstValue: number, secondValue: number) => number
}
```

### Mouse event

```ts
interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}
```

### Form event

```tsx
import React from 'react'

const MyInput = () => {
  const [value, setValue] = React.useState('')

  // The event type is a "ChangeEvent"
  // We pass in "HTMLInputElement" to the input
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  return <input value={value} onChange={onChange} id="input-example"/>
}
```


## Hooks

```tsx
type User = {
  email: string;
  id: string;
}

// the generic is the < >
// the union is the User | null
// together, TypeScript knows, "Ah, user can be User or null".
const [user, setUser] = useState<User | null>(null);
```


### Extending Component Props

```tsx
import React from 'react';

type ButtonProps = {
  /** the background color of the button */
  color: string;
  /** the text to show inside the button */
  text: string;
}

type ContainerProps = ButtonProps & {
  /** the height of the container (value used with 'px') */
  height: number;
}

const Container: React.FC<ContainerProps> = ({ color, height, width, text }) => {
  return <div style={{ backgroundColor: color, height: `${height}px` }}>{text}</div>
}
```

```tsx
import React from 'react';

interface ButtonProps {
  /** the background color of the button */
  color: string;
  /** the text to show inside the button */
  text: string;
}

interface ContainerProps extends ButtonProps {
  /** the height of the container (value used with 'px') */
  height: number;
}

const Container: React.FC<ContainerProps> = ({ color, height, width, text }) => {
  return <div style={{ backgroundColor: color, height: `${height}px` }}>{text}</div>
}
```


## References

- https://basarat.gitbook.io/typescript/
- https://github.com/basarat/typescript-react
- https://github.com/typescript-cheatsheets/react-typescript-cheatsheet
- https://github.com/vikpe/react-webpack-typescript-starter