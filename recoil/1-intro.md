# Introduction

## Core Concepts

### Atoms

Recoil lets you create a data-flow graph that flows from atoms (shared state) through selectors (pure functions) and down into your React components. 

Atoms are units of state. They're updateable and subscribable: when an atom is updated, each subscribed component is re-rendered with the new value.

Selectors transform this state either synchronously or asynchronously.

Atoms are created using the `atom` function:

```js
const fontSizeState = atom({
  key: 'fontSizeState',
  default: 14,
});
```

Atoms need a unique key, like React component state, they also have a default value.

To read and write an atom from a component, we use a hook called `useRecoilState`

```js
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return (
    <button onClick={() => setFontSize((size) => size + 1)} style={{fontSize}}>
      Click to Enlarge
    </button>
  );
}
```

### Selectors

A selector is a pure function that accepts atoms or other selectors as input. When these upstream atoms or selectors are updated, the selector function will be re-evaluated.

Components can subscribe to selectors just like atoms, and will then be re-rendered when the selectors change.

**Selectors are used to calculate derived data that is based on state**. This lets us avoid redundant state because a minimal set of state is stored in atoms, while everything else is efficiently computed as a function of that minimal state.

From the point of view of components, selectors and atoms have the same interface and can therefore be substituted for one another.

Selectors are defined using the `selector` function:

```js
const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({get}) => {
    const fontSize = get(fontSizeState);
    const unit = 'px';

    return `${fontSize}${unit}`;
  },
});
```

The `get` **property** is the function that is to be computed. It can access the value of atoms and other selectors using the `get` **argument** passed to it. Whenever it accesses another atom or selector, a dependency relationship is created such that updating the other atom or selector will cause this one to be recomputed.

Selectors can be read using `useRecoilValue()`, which takes an atom or selector as an argument and returns the corresponding value. 

```js
function FontButton() {
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <div>Current font size: {fontSizeLabel}</div>
  );
}
```

## Installation

```sh
yarn add recoil
```

### Integrate

Components that use recoil state need `RecoilRoot` to appear somewhere in the parent tree. A good place to put this is in your root component:

```jsx
import React from 'react';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```

### Atom

Define atom:

```js
import { atom } from 'recoil';
const textState = atom({
  // unique ID (with respect to other atoms/selectors)
  key: 'textState',

  // default value (aka initial value)
  default: '',
});
```

Access atom:

```jsx
import React from 'react';
import { useRecoilState } from 'recoil';

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
```

### Selector

Define selector:

```js
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});
```

Get selector's value:

```js
function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}
```


## ESLint

```json
// modified .eslint config
{
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn", {
        "additionalHooks": "useRecoilCallback"
      }
    ]
  }
}
```