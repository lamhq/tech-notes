# Contextual modal navigation

## Problem

This type of modal is typically used as a kind of "detail" view to focus on a particular object in a collection while not taking you completely out of context of the parent page.

But, when the same URL is visited directly (rather than from the collection page) it renders as it's own full page instead of in a modal.

Example: pinterest, facebook.


## Solution

When user click an item in the collection page, we:
- navigate to the location of detail view
- save the current location to the state of the next location

It can be done by using `<Link>` component:

```jsx
<Link
  to={`/img/${image.id}`}
  state={{ prevLocation: location }}
>
  <img src={image.src} />
</Link>
```

When rendering routes, we check if previous location is set:
1. render the components match with the previous location
2. render the detail view in modal

else, render the component match with current location. Here's the code:

```jsx
let location = useLocation();
let { state } = location;

{/* 
 Show the previous page if`prevLocation` is set, 
 otherwise show the view corresponding to current location
*/}
<Routes location={state.prevLocation || location}>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="gallery" element={<Gallery />} />
    <Route path="/img/:id" element={<ImageView />} />
    <Route path="*" element={<NoMatch />} />
  </Route>
</Routes>

{/* Show the modal when a `prevLocation` is set */}
{state.prevLocation && (
  <Routes>
    <Route path="/img/:id" element={<Modal />} />
  </Routes>
)}
```

See the full code [here](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/modal?file=src/App.tsx).