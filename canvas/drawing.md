## Basic usage

```html
<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    canvas {
      border: 1px solid black;
    }
  </style>
  <script>
    function draw() {
      var canvas = document.getElementById('canvas');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);
      }
    }
  </script>

  <title>Canvas</title>
</head>

<body onload="draw();">
  <canvas id="canvas" width="500" height="500"></canvas>
</body>

</html>
```


## The grid

![](https://mdn.mozillademos.org/files/224/Canvas_default_grid.png)


## Drawing rectangles
```js
// Draws a filled rectangle.
ctx.fillRect(x, y, width, height)

// Draws a rectangular outline.
ctx.strokeRect(x, y, width, height)

// Clears the specified rectangular area, making it fully transparent.
ctx.clearRect(x, y, width, height)

// Draws a rectangle whose top-left corner is specified by (x, y) with the specified width and height.
ctx.rect(x, y, width, height)
```


## Drawing paths
```js
// Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up.
ctx.beginPath()

// Adds a straight line to the path, going to the start of the current sub-path.
ctx.closePath()

// Draws the shape by stroking its outline.
ctx.stroke()

// Draws a solid shape by filling the path's content area.
// When you call `fill()`, any open shapes are closed automatically, so you don't have to call `closePath()`
ctx.fill()

// Moves the pen to the coordinates specified by x and y.
ctx.moveTo(x, y)

// Draws a line from the current drawing position to the position specified by x and y.
ctx.lineTo(x, y)
```


## Arcs
```js
// Draws an arc which is centered at (x, y) position with radius r starting at startAngle and ending at endAngle going in the given direction indicated by anticlockwise (defaulting to clockwise).
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
ctx.arc(200, 200, 100, 180, (Math.PI/180)*180);

// Draws an arc with the given control points and radius, connected to the previous point by a straight line.
ctx.arcTo(x1, y1, x2, y2, radius);
```


## Path2D objects

Path2D object lets you cache or record these drawing commands. You are able to play back your paths quickly.

Another powerful feature of the new canvas Path2D API is using SVG path data to initialize paths on your canvas. This might allow you to pass around path data and re-use them in both, SVG and canvas.

```js
var rectangle = new Path2D();
rectangle.rect(10, 10, 50, 50);
ctx.stroke(rectangle);
```

