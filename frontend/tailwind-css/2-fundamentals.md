# Utility-First Fundamentals

With Tailwind, you style elements by using utility classes to build custom designs without writing CSS.

## Benefits

- **You aren’t wasting energy inventing class name**s.
- **Your CSS stops growing**. Using a traditional approach, your CSS files get bigger every time you add a new feature. With utilities, everything is reusable so you rarely need to write new CSS.
- **Making changes feels safer**. CSS is global and you never know what you’re breaking when you make a change. Classes in your HTML are local, so you can change them without worrying about something else breaking.


## Why not just use inline styles?

But using utility classes has a few important advantages over inline styles:

- Designing with constraints. With utilities, you’re choosing styles from a predefined design system, which makes it much easier to build visually consistent UIs.
- Responsive design. You can’t use media queries in inline styles, but you can use Tailwind’s responsive utilities to build fully responsive interfaces easily.
- Hover, focus, and other states. Inline styles can’t target states like hover or focus, but Tailwind’s state variants make it easy to style those states with utility classes.


## Maintainability concerns

The biggest maintainability concern when using a utility-first approach is managing commonly repeated utility combinations.

This is easily solved by:
- extracting components and partials
- using editor and language features like multi-cursor editing and simple loops.

Maintaining a utility-first CSS project turns out to be a lot easier than maintaining a large CSS codebase, simply because HTML is so much easier to maintain than CSS. 
