## globalCompositeOperationSection

[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing#globalCompositeOperation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing#globalCompositeOperation)


## Clipping paths

A clipping path is like a normal canvas shape but it acts as a mask to hide unwanted parts of shapes. 

The most important differences between `globalCompositeOperation` and clipping are that clipping paths are never actually drawn to the canvas and the clipping path is never affected by adding new shapes. This makes clipping paths ideal for drawing multiple shapes in a restricted area.

```js
// Turns the path currently being built into the current clipping path.
ctx.clip()

// Create a circular clipping path
ctx.beginPath();
ctx.arc(0, 0, 60, 0, Math.PI * 2, true);
ctx.clip();
```