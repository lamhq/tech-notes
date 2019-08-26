## Assign properties to a complete set of elements

```xml
<svg width="30" height="10">
    <g fill="red">
        <rect x="0" y="0" width="10" height="10" />
        <rect x="20" y="0" width="10" height="10" />
    </g>
</svg>
```


## Translation

When using transformations you establish a new coordinate system inside the element the transformations apply to. That means, the units you specify for the element and its children might not follow the 1:1 pixel mapping, but are also distorted, skewed, translated and scaled according to the transformation.

```xml
<svg width="40" height="50" style="background-color:#bff;">
    <rect x="0" y="0" width="10" height="10" transform="translate(30,40)" />
</svg>
```


## Rotation

```xml
<svg width="31" height="31">
    <rect x="12" y="-10" width="20" height="20" transform="rotate(45)" />
</svg>
```


## Multiple transformations

```xml
<svg width="40" height="50" style="background-color:#bff;">
    <rect x="0" y="0" width="10" height="10" transform="translate(30,40) rotate(45)" />
</svg>
```


## Skewing, Scaling

- `skewX()`, `skewY()`
- `scale(x, y)`