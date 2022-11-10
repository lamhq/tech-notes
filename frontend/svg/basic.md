## Basic shapes

```xml
<svg width="200" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>
  <rect x="60" y="10" rx="10" ry="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>

  <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/>
  <ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="5"/>

  <line x1="10" x2="50" y1="110" y2="150" stroke="orange" stroke-width="5"/>
  <polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145"
      stroke="orange" fill="transparent" stroke-width="5"/>

  <polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
      stroke="green" fill="transparent" stroke-width="5"/>

  <path d="M 10 10 H 90 V 90 H 10 L 10 10" fill="none" stroke="blue" stroke-width="5"/>
</svg>
```


## Line commands

```js
// Move to an absolute coordinates on the page. It takes two parameters, a coordinate  ' x ' and coordinate ' y ' to move to.
M x y

// Move by a distance from the last coordinates
m dx dy

// Draws a line from the current position to a new position.
L x y

// Draws a horizontal line
H x (or h dx)

// V draws a vertical line.
V y (or v dy)

// Draws a straight line from the current position back to the first point of the path
Z (or z)
```


## Curve commands

```js
// The cubic curve
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves
C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)

// You can string together several Bezier curves to create extended, smooth shapes. S produces the same type of curve as earlier
// if it follows another S command or a C command, the first control point is assumed to be a reflection of the one used previously. 
// If the S command doesn't follow another S or C command, then the current position of the cursor is used as the first control point
S x2 y2, x y (or s dx2 dy2, dx dy)

// Quadratic curve 
// It takes two arguments: the control point and the end point of the curve
Q x1 y1, x y (or q dx1 dy1, dx dy)

// There is a shortcut for stringing together multiple quadratic Beziers, called with T.
T x y (or t dx dy)
```


## Arc commands
```js
// The first two arguments for the x-radius and y-radius.
// The final two arguments designate the x and y coordinates to end the stroke
// The third parameter describes the rotation of the arc.
// For a given x-radius and y-radius, there are two ellipses that can connect any two points
// therefore, there are four different paths, which path is choosen is determined by the two argument flags
A rx ry x-axis-rotation large-arc-flag sweep-flag x y
a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
```
