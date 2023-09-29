# Images

## Decorative images

If an image is not important for a user to understand the functionality or the content of a web page or app, it is considered decorative. Can you remove it with no impact? Then it is a decorative image.

Screen readers will ignore decorative images.

Ways to set an image as decorative:
- Use an empty `alt` attribute.
- Use the CSS `background-image` property to add decorative images.
- Use `aria-hidden="true"`. If component is not `img` or `svg`, add `role="img"`

Examples: illustrative icon of links 

![](https://www.w3schools.com/accessibility/img_alibaba-top.png)

```html
<img src="Ha50044a3568449409f3396e5b36be8c3h.png_80x80q80.jpg" alt="">

<i class="navbarIcon" role="img" aria-hidden="true"></i>

<svg aria-hidden="true" …></svg>
```


## Meaningful images

Most of our images are meaningful. Example: product image, logo.

To make a meaningful image:

- Use `alt` attribute of `img`
- For non `img` tag, add `role="img"`, then add `aria-label` or `aria-labelledby` attribute.

```html
<div role="img" aria-label="Private house, modern architecture. Minimalistic with a big garage.">
```

![](https://www.w3schools.com/accessibility/img_caledonbuild.png)


### Descriptive Texts for Images

The value of the `alt` attribute should describe the image, or even better: the **intention** of the image. 

For example, the logo has two reasons. First of all, to tell the users which site they are on. Second, to provide the users a link back to the front page.

Good description:

```html
<img src="alibaba-logo.svg" alt="Alibaba logo">
```

Best:

```html
<img src="alibaba-logo.svg" alt="Home of Alibaba">
```

Other examples:

- Product pictures:
  - *"Dr. Nam whole bean coffee. Medium roast. 500 grams. UTZ certified."*
  - *"Kicker Sports men's jacket. Full zipper. Gray arms. Black and white pattern in front. Two pockets with buttons on the sides."*
- Background images: *Private house, modern architecture with straight lines. Minimalistic with a big garage*
- Stand-alone icons: *"Share on Twitter"*, *"Share on Facebook"*
- Badges: *"On sale"*
- Logos: *"Medium home"*