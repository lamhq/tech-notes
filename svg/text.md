## Text
```xml
<text x="10" y="10">Hello World!</text>
```

## Attributes

- text-anchor: "start", "middle", "end" or "inherit", decides in which direction the text flows from this point.
- fill
- stroke
- font-family, font-style, font-weight, font-variant, font-stretch, font-size, font-size-adjust, kerning, letter-spacing, word-spacing, text-decoration

## Text path

```xml
<path id="my_path" d="M 20,20 C 80,60 100,40 120,20" fill="transparent" />
<text>
  <textPath xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#my_path">
    A curve.
  </textPath>
</text>
```