## Saving and restoring state

```js
// Saves the entire state of the canvas. Canvas states are stored on a stack. 
// Every time the save() method is called, the current drawing state is pushed onto the stack
ctx.save();

// Restores the most recently saved canvas state.
ctx.restore();
```


## Translating, Rotating, Scaling

```js
// Moves the canvas and its origin on the grid. x indicates the horizontal distance to move, and y indicates how far to move the grid vertically.
ctx.translate(x, y);

// Rotates the canvas clockwise around the current origin by the angle number of radians.
ctx.rotate(angle);

// Scales the canvas units by x horizontally and by y vertically
ctx.scale(x, y);
```