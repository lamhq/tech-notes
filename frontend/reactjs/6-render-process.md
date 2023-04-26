# Render and Commit

The process of requesting and serving UI has three steps:

- Triggering a render
- Rendering the component
- Committing to the DOM

## Step 1: Trigger a render

There are two reasons for a component to render:

- It’s the component’s initial render.
- The component’s (or one of its ancestors’) state has been updated.

### Initial render

it’s done by calling `createRoot` with the target DOM node, and then calling its render method with your component:

```js
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

### Re-renders when state updates

Once the component has been initially rendered, you can trigger further renders by updating its state with the `setState` function


## Step 2: React renders your components

After you trigger a render, React calls your components to figure out what to display on screen.

- On initial render, React will call the root component.
- For subsequent renders, React will call the function component whose state update triggered the render.

When React re-renders a component:

- React calls your function again.
- Your function returns a new JSX snapshot.
- React then updates the screen to match the snapshot you’ve returned.


## Step 3: React commits changes to the DOM 

After rendering (calling) your components, React will modify the DOM.

- For the **initial render**, React will use the appendChild() DOM API to put all the DOM nodes it has created on screen.
- For **re-renders**, React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.

React only changes the DOM nodes if there’s a difference between renders.


## The UI tree

React uses tree structures to manage and model the UI you make. 

React makes UI trees from your JSX. Then React DOM updates the browser DOM elements to match that UI tree. 

*From components, React creates a UI tree which React DOM uses to render the DOM:*

![](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_dom_tree.dark.png&w=1920&q=75)


## Component lifecycle

- A component **mounts** when it’s added to the screen.
- A component **updates** when it receives new props or state, usually in response to an interaction.
- A component **unmounts** when it’s removed from the screen.