# React Best Practices

## Performance

In practice, you can make a lot of memoization unnecessary by following a few principles:

1. When a component visually wraps other components, let it **accept JSX as children**. This way, when the wrapper component updates its own state, React knows that its children don’t need to re-render.
2. **Prefer local state** and don’t lift state up any further than necessary. For example, don’t keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
3. **Keep your rendering logic pure**. It must return the same output if its props, state, and context haven’t changed.
4. **Avoid unnecessary Effects that update state**. Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
5. Try to **remove unnecessary dependencies from your Effects**. For example, instead of memoization, it’s often simpler to move some object or a function inside an Effect or outside the component.

If a specific interaction still feels laggy, use the React Developer Tools profiler to see which components would benefit the most from memoization, and add memoization where needed.
