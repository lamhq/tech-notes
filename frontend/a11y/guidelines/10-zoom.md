# Zoom

## Text Size

**Users must be able to change the text size without zooming the entire interface**.

This is done in the settings of the operating system or the browser. In the Chrome browser on desktop, you can set the font size in settings under **Appearance** > **Customize fonts**.

### Techniques

- use `rem` instead of `px` for `font-size` (the base size is 16 px). e.g. `font-size: 1.125rem;`
- Strive to use relative units. Use a number without a unit for `line-height`. `line-height: 1.2;`
- avoid setting fixed height for elements
- avoid using `line-clamp` property


## Page Zoom

People with low vision need to zoom the content in order to use the page. The site should scale when zoomed.

Here're five techniques to support page zoom:

### Do not let secondary content occupy the screen

- No content are hidden or overlapped.
- Do not let secondary content occupy the screen. Minimize it by default.
- Use **vector graphics** like SVG instead of raster graphics like PNG.
- Show mobile ads only for mobile devices.
- The viewport is set:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```

### Avoid horizontal scrolling

- Make the site responsive.
- Text fixed position content when zoomed.


### Avoid text in images

The zoomed text is pixelated because it is part of the image.

![](https://www.w3schools.com/accessibility/img_xiaomi_zoom400.png)

Displaying text with pure HTML and CSS has many benefits, in addition to be accessible: responsive, translatable and searchable.