# Utilities

## Border
```html
<!-- Additive -->
<span class="border"></span>
<span class="border-top"></span>
<span class="border-right"></span>
<span class="border-bottom"></span>
<span class="border-left"></span>

<!-- Subtractive -->
<span class="border-0"></span>
<span class="border-top-0"></span>
<span class="border-right-0"></span>
<span class="border-bottom-0"></span>
<span class="border-left-0"></span>

<!-- Border color -->
<span class="border border-primary"></span>
<span class="border border-secondary"></span>
<span class="border border-success"></span>
<span class="border border-danger"></span>
<span class="border border-warning"></span>
<span class="border border-info"></span>
<span class="border border-light"></span>
<span class="border border-dark"></span>
<span class="border border-white"></span>

<!-- Border-radius -->
<img src="..." alt="..." class="rounded">
<img src="..." alt="..." class="rounded-top">
<img src="..." alt="..." class="rounded-right">
<img src="..." alt="..." class="rounded-bottom">
<img src="..." alt="..." class="rounded-left">
<img src="..." alt="..." class="rounded-circle">
<img src="..." alt="..." class="rounded-pill">
<img src="..." alt="..." class="rounded-0">

<!-- Sizes -->
<img src="..." alt="..." class="rounded-sm">
<img src="..." alt="..." class="rounded-lg">
```

## Close icon

```html
<button type="button" class="close" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
```


## Color

```html
<div class="p-3 mb-2 bg-primary text-white">.bg-primary</div>
<div class="p-3 mb-2 bg-secondary text-white">.bg-secondary</div>
<div class="p-3 mb-2 bg-success text-white">.bg-success</div>
<div class="p-3 mb-2 bg-danger text-white">.bg-danger</div>
<div class="p-3 mb-2 bg-warning text-dark">.bg-warning</div>
<div class="p-3 mb-2 bg-info text-white">.bg-info</div>
<div class="p-3 mb-2 bg-light text-dark">.bg-light</div>
<div class="p-3 mb-2 bg-dark text-white">.bg-dark</div>
<div class="p-3 mb-2 bg-white text-dark">.bg-white</div>
<div class="p-3 mb-2 bg-transparent text-dark">.bg-transparent</div>
```


## Display

- `.d-{value}` for `xs`
- `.d-{breakpoint}-{value}` for `sm`, `md`, `lg`, and `xl`.

Where value is one of:

- `none`
- `inline`
- `inline-block`
- `block`
- `table`
- `table-cell`
- `table-row`
- `flex`
- `inline-flex`

```html
<div class="d-inline">d-inline</div>
<span class="d-block">d-block</span>

<div class="d-lg-none">hide on lg and wider screens</div>
<div class="d-none d-lg-block">hide on screens smaller than lg</div>
```


## Embed

Create responsive video or slideshow embeds based on the width of the parent by creating an intrinsic ratio that scales on any device.

```html
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
</div>

<!-- 21:9 aspect ratio -->
<div class="embed-responsive embed-responsive-21by9">
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>

<!-- 16:9 aspect ratio -->
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>

<!-- 4:3 aspect ratio -->
<div class="embed-responsive embed-responsive-4by3">
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>

<!-- 1:1 aspect ratio -->
<div class="embed-responsive embed-responsive-1by1">
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>
```


## Flex

Container classes:

- `.d-flex`
- `.flex-row`
- `.flex-row-reverse`
- `.flex-column`
- `.flex-column-reverse`
- `.flex-sm-row`
- ...(responsive variations)
- `.justify-content-start`
- `.justify-content-end`
- `.justify-content-center`
- `.justify-content-between`
- `.justify-content-around`
- `.justify-content-sm-start`
- ...(responsive variations)
- `.align-items-start`
- `.align-items-end`
- `.align-items-center`
- `.align-items-baseline`
- `.align-items-stretch`
- `.align-items-sm-start`
- ...(responsive variations)
- `.flex-nowrap`
- `.flex-wrap`
- `.flex-wrap-reverse`
- `.flex-sm-nowrap`
- ...(responsive variations)
- `.align-content-start`
- `.align-content-end`
- `.align-content-center`
- `.align-content-around`
- `.align-content-stretch`
- `.align-content-sm-start`

Children classes:

- `.align-self-start`
- `.align-self-end`
- `.align-self-center`
- `.align-self-baseline`
- `.align-self-stretch`
- `.align-self-sm-start`
- ...(responsive variations)
- `.flex-fill`
- `.flex-sm-fill`
- `.flex-grow-*`
- `.flex-shrink-*`
- `.flex-sm-{grow|shrink}-0`
- ...(responsive variations)
- `.mr-auto`: pushing two items to the right
- `.ml-auto`: pushing two items to the left
- `.order-0`
- `.order-1`
- `.order-2`
- `.order-3`
- `.order-4`
- `.order-5`
- `.order-6`
- `.order-7`
- `.order-8`
- `.order-9`
- `.order-10`
- `.order-11`
- `.order-12`
- `.order-sm-0`
- ...(responsive variations)


## Text selection

```html
<p class="user-select-all">This paragraph will be entirely selected when clicked by the user.</p>
<p class="user-select-auto">This paragraph has the default select behavior.</p>
<p class="user-select-none">This paragraph will not be selectable when clicked by the user.</p>
```


## Overflow

```html
<div class="overflow-auto">...</div>
<div class="overflow-hidden">...</div>
```


## Position

```html
<div class="position-static">...</div>
<div class="position-relative">...</div>
<div class="position-absolute">...</div>
<div class="position-fixed">...</div>
<div class="position-sticky">...</div>
<div class="fixed-top">...</div>
<div class="fixed-bottom">...</div>
<div class="sticky-top">...</div>
```


## Shadows

```html
<div class="shadow-none p-3 mb-5 bg-light rounded">No shadow</div>
<div class="shadow-sm p-3 mb-5 bg-white rounded">Small shadow</div>
<div class="shadow p-3 mb-5 bg-white rounded">Regular shadow</div>
<div class="shadow-lg p-3 mb-5 bg-white rounded">Larger shadow</div>
```


## Spacing

The classes are named using the format `{property}{sides}-{size}` for `xs` and `{property}{sides}-{breakpoint}-{size}` for `sm`, `md`, `lg`, and `xl`.

Where property is one of:

- `m` - for classes that set margin
- `p` - for classes that set padding

Where sides is one of:

- `t` - for classes that set `margin-top` or `padding-top`
- `b` - for classes that set `margin-bottom` or `padding-bottom`
- `l` - for classes that set `margin-left` or `padding-left`
- `r` - for classes that set `margin-right` or `padding-right`
- `x` - for classes that set both `*-left` and `*-right`
- `y` - for classes that set both `*-top` and `*-bottom`
- blank - for classes that set a `margin` or `padding` on all 4 sides of the element

Where size is one of:

- `0` - for classes that eliminate the `margin` or `padding` by setting it to `0`
- `1` - (by default) for classes that set the `margin` or `padding` to `$spacer * .25`
- `2` - (by default) for classes that set the `margin` or `padding` to `$spacer * .5`
- `3` - (by default) for classes that set the `margin` or `padding` to `$spacer`
- `4` - (by default) for classes that set the `margin` or `padding` to `$spacer * 1.5`
- `5` - (by default) for classes that set the `margin` or `padding` to `$spacer * 3`
- `auto` - for classes that set the `margin` to auto

```html
<div class="mx-auto" style="width: 200px;">
  Centered element
</div>

<div class="row mx-md-n5">
  <div class="col px-md-5"><div class="p-3 border bg-light">Custom column padding</div></div>
  <div class="col px-md-5"><div class="p-3 border bg-light">Custom column padding</div></div>
</div>
```


## Stretched link

Make an element with `position: relative;` that contains a link with the `.stretched-link` class is clickable.

```html
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card with stretched link</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary stretched-link">Go somewhere</a>
  </div>
</div>

<div class="media position-relative">
  <img src="..." class="mr-3" alt="...">
  <div class="media-body">
    <h5 class="mt-0">Media with stretched link</h5>
    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
    <a href="#" class="stretched-link">Go somewhere</a>
  </div>
</div>
```


## Text

- `.text-left`
- `.text-center`
- `.text-right`
- `.text-justify`
- `.text-wrap`
- `.text-nowrap`
- `.text-truncate`: truncate the text with an ellipsis. Requires display: `inline-block` or `display: block`
- `.text-break`: prevent long strings of text from breaking your components’ layout
- `.text-lowercase`
- `.text-uppercase`
- `.text-capitalize`
- `.font-weight-bold`
- `.font-weight-bolder`
- `.font-weight-normal`
- `.font-weight-light`
- `.font-weight-lighter`
- `.font-italic`
- `.text-monospace`
- `.text-reset`: inherits the color from its parent
- `.text-decoration-none`

```html
<p class="text-justify">Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.</p>
```


## Vertical alignment

Change the vertical alignment of inline, inline-block, inline-table, and table cell elements.

```html
<span class="align-baseline">baseline</span>
<span class="align-top">top</span>
<span class="align-middle">middle</span>
<span class="align-bottom">bottom</span>
<span class="align-text-top">text-top</span>
<span class="align-text-bottom">text-bottom</span>
```


## Visibility

These utility classes do not modify the display value at all and do not affect layout .invisible elements still take up space in the page.

```html
<div class="visible">...</div>
<div class="invisible">...</div>
```