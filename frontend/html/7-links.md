# Links

The `<a>` anchor tag, along with the `href` attribute, create a hyperlink.


## The `href` attribute

The `href` attribute is used to create hyperlinks to locations within the current page, other pages within a site, or other sites altogether.

**Absolute URLs** include a protocol, in this case `https://`, and a
domain name. When the protocol is written simply as `//`, it is an implicit protocol and means "use the same protocol as is currently being used."

**Relative URLs** do not include a protocol or domain name. They are "relative" to the current file.

Browsers also support two **"top of page"** links: clicking
on `<a href="#top">Top</a>` (case-insensitive) or simply `<a href="#">Top</a>` will scroll the user to the top of the page,
unless there is an element with the id of `top` set in the same letter casing.

### Email

The `href` attribute can begin with `mailto:` or `tel:` to email or make calls, with the handling of the link depending on the device,
operating system, and installed applications.

The `mailto` link doesn't need to include an email address, but it can, along with `cc`, `bcc`, `subject`, and `body` text to
prepopulate the email.

```html
<a href="mailto:?subject=Join%20me%21&body=You%20need%20to%20show%20your%20human%20that%20you%20can%27t%20be%20owned%21%20Sign%20up%20for%20Machine%20Learning%20workshop.%20We%20are%20taking%20over%20the%20world.%20http%3A%2F%2Fwww.machinelearning.com%23reg
">Tell a machine</a>
```

The question mark (`?`) separates the `mailto:` and the email address, if any, from the query term. Within the query,
ampersands (`&`) separate the fields, and equal signs (=) equate each field name with its value. The entire string is
percent-encoded, which is definitely necessary if the `href` value isn't quoted or if the values include quotes.


## Downloadable resources

The `download` attribute should be included when the `href` points to a downloadable resource. The value of the download
attribute is the suggested filename for the resource to be saved in the user's local file system.


## Browsing context

The `target` attribute enables the defining of the browsing context for link navigation:

- `_self` (default), which is the current window.
- `_blank`, which opens the link in a new tab.
- `_parent`, which is the parent if the current link is nested
in an object or iframe.
- `_top`, which is the top-most ancestor, especially useful if the current link is deeply nested.
- `_top` and `_parent` are the same as `_self` if the link is not nested.

The `rel` attribute definé the relationship between the current document and the resource linked to in the hyperlink:
- The `nofollow` keyword can be included if you don't want spiders to follow the link.
- The `external` value can be added to
indicate that the link directs to an external URL and is not a page within the current domain.
- The `help` keyword indicates the hyperlink will
provide context-sensitive help.
- The `prev` and `next` values can
be used on links pointing to the previous and next document in a series.

### Languages

In this example, we include the URL of the translated page as the value of the `href`, rel="alternate" to indicate that it's an alternative version of a site; the `hreflang`
attribute provides the language of the translations:

```html
<a href="/fr/" hreflang="fr-FR" rel="alternate" lang="fr-FR">atelier d'apprentissage mechanique</a>
<a href="/pt/" hreflang="pt-BR" rel="alternate" lang="pt-BR">oficina de aprendizado de máquina</a>
```


## User experience tips

Within a block of text, **ensure the appearance of your links differs enough from the surrounding text** so that users can
easily identify links from the rest of the content, ensuring that color alone is not the only means of differentiating between
text and the surrounding content.

Always include **focus styles**; this enables keyboard navigators to know where they are when tabbing through your content.

The content between the opening `<a>` and closing `</a>` is the link's default accessible name and should inform the user
of the link's destination or purpose. If the content of a link is an image, the `alt` description is the accessible name.

Link text should be more descriptive than "click here" or "more information"; this is important for your screen reader users and your search engine results!

Don't include interactive content, such as a `<button>` or `<input>`, inside a link. Don't nest a link within a `<button>`
or `<label>` either. While the HTML page will still render, nesting focusable and clickable elements inside interactive elements creates a bad user experience.

If the `href` attribute is present, pressing the Enter key while focused on the `<a>` element will activate it.

Links are not limited to HTML. The `a` element can also be used within an SVG, forming a link with either the 'href' or 'xlink:href' attributes.
