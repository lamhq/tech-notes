## Colors
```js
// Sets the style used when filling shapes.
ctx.fillStyle = color

// Sets the style for shapes' outlines.
ctx.strokeStyle = color

ctx.fillStyle = 'orange';
ctx.fillStyle = '#FFA500';
ctx.fillStyle = 'rgb(255, 165, 0)';
ctx.fillStyle = 'rgba(255, 165, 0, 1)';
```


## Line styles
```js
// Sets the width of lines drawn in the future.
ctx.lineWidth = 1.0;

// The lineCap property determines how the end points of every line are drawn.
ctx.lineCap = 'butt' | 'round' | 'square';

// The lineJoin property determines how two connecting segments (of lines, arcs or curves) 
ctx.lineJoin = 'round' | 'bevel' | 'miter';

// The miterLimit property determines how far the outside connection point can be placed from the inside connection point.
ctx.miterLimit = 10;

// The setLineDash method accepts a list of numbers that specifies distances to alternately draw a line and a gap
ctx.setLineDash([4, 2]);

// The lineDashOffset property sets an offset where to start the pattern.
ctx.lineDashOffset = -1;
```


## Gradients

[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#Gradients](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#Gradients)


## Patterns

[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#Patterns](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#Patterns)


## Shadows

[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#Shadows](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#Shadows)


## Canvas fill rules

[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#Canvas_fill_rules](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#Canvas_fill_rules)