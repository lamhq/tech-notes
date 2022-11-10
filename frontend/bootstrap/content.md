# Content

## Customizing headings

```html
<h3>
  Fancy display heading
  <small class="text-muted">With faded secondary text</small>
</h3>
```


## Display headings

```html
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>
```


## Inline text elements

```html
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>
```


## Abbreviations

```html
<p><abbr title="attribute">attr</abbr></p>
<p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr></p>
```


## Blockquotes

```html
<blockquote class="blockquote">
  <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
</blockquote>
```


## Lists

### Unstyled

```html
<ul class="list-unstyled">
  <li>Lorem ipsum dolor sit amet</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit
    <ul>
      <li>Phasellus iaculis neque</li>
      <li>Purus sodales ultricies</li>
    </ul>
  </li>
  <li>Faucibus porta lacus fringilla vel</li>
</ul>
```


### Inline

```html
<ul class="list-inline">
  <li class="list-inline-item">Lorem ipsum</li>
  <li class="list-inline-item">Phasellus iaculis</li>
  <li class="list-inline-item">Nulla volutpat</li>
</ul>
```


### Description list alignment

```html
<dl class="row">
  <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
  <dd class="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

  <dt class="col-sm-3">Nesting</dt>
  <dd class="col-sm-9">
    <dl class="row">
      <dt class="col-sm-4">Nested definition list</dt>
      <dd class="col-sm-8">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>
    </dl>
  </dd>
</dl>
```


## Responsive font sizes

RFS can be enabled by changing the `$enable-responsive-font-sizes` Sass variable to true and recompiling Bootstrap.

To support RFS, we use a Sass mixin to replace our normal `font-size` properties. Responsive font sizes will be compiled into `calc()` functions with a mix of rem and viewport units to enable the responsive scaling behavior.


## Code

```html
<!-- Inline code -->
For example, <code>&lt;section&gt;</code> should be wrapped as inline.

<!-- Code blocks -->
<pre><code>&lt;p&gt;Sample text here...&lt;/p&gt;
&lt;p&gt;And another line of sample text here...&lt;/p&gt;
</code></pre>

<!-- User input -->
To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>
To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>

<!-- Sample output -->
<samp>This text is meant to be treated as sample output from a computer program.</samp>
```


## Images

```html
<!-- Responsive images -->
<img src="..." class="img-fluid" alt="Responsive image">

<!-- Image thumbnails -->
<img src="..." alt="..." class="img-thumbnail">

<!-- Aligning images -->
<img src="..." class="rounded float-left" alt="...">
<img src="..." class="rounded float-right" alt="...">
<img src="..." class="rounded mx-auto d-block" alt="...">
<div class="text-center">
  <img src="..." class="rounded" alt="...">
</div>

<!-- Picture -->
​<picture>
  <source srcset="..." type="image/svg+xml">
  <img src="..." class="img-fluid img-thumbnail" alt="...">
</picture>
```


## Table

```html
<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
  </tbody>
</table>

<!-- Table head -->
<thead class="thead-dark">
<thead class="thead-light">

<!-- Striped rows -->
<table class="table table-striped">

<!-- Bordered table -->
<table class="table table-bordered">

<!-- Borderless table -->
<table class="table table-borderless">

<!-- Hoverable rows -->
<table class="table table-hover">

<!-- Small table -->
<table class="table table-sm">

<!-- Captions -->
<table class="table">
  <caption>List of users</caption>
</table>

<!-- Responsive tables -->
<div class="table-responsive">
  <table class="table">
    ...
  </table>
</div>
```


## Figure

Anytime you need to display a piece of content—like an image with an optional caption, consider using a `<figure>`.

```html
<figure class="figure">
  <img src="..." class="figure-img img-fluid rounded" alt="...">
  <figcaption class="figure-caption">A caption for the above image.</figcaption>
</figure>
```
