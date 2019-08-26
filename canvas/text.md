## Drawing text
```js
// Fills a given text at the given (x,y) position. Optionally with a maximum width to draw.
ctx.fillText(text, x, y [, maxWidth])

// Strokes a given text at the given (x,y) position. Optionally with a maximum width to draw.
ctx.strokeText(text, x, y [, maxWidth])

ctx.font = '48px serif';
ctx.fillText('Hello world', 10, 50);
```


## Styling text
```js
// The current text style being used when drawing text. The same syntax as the CSS font property
ctx.font = '48px serif';

// Baseline alignment setting. Possible values: top, hanging, middle, alphabetic, ideographic, bottom.
ctx.textBaseline = 'hanging';

// Text alignment setting. Possible values: start, end, left, right or center.
ctx.textAlign = value;

// Directionality. Possible values: ltr, rtl, inherit.
ctx.direction = value;
```