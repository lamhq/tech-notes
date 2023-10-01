# Sections

## Document structure

A layout with a header, two sidebars, and a  footer, is known as the [holy grail layout](/patterns/layout/holy-grail/):

![](https://web-dev.imgix.net/image/kheDArv5csY6rvQUJDbWRscckLr1/LJs8vlTVDYBmM6t1z6rD.png?auto=format&w=1600)

```html
<body>
  <header>Header</header>
  <nav>Nav</nav>
  <main>
    <article>First post</article>
    <article>Second post</article>
  </main>
  <aside>Aside</aside>
  <footer>Footer</footer>
</body>
```


## `<header>`

```html
<header>
  <h1>Machine Learning Workshop</h1>
  <nav>
    <a href="#reg">Register</a>
    <a href="#about">About</a>
    <a href="#teachers">Instructors</a>
    <a href="#feedback">Testimonials</a>
  </nav>
</header>
```

This code uses two semantic landmarks: `<header>` and `<nav>`.

The `<header>` element has different semantics depending on where it is nested. 

When the `<header>` is top level, it is the site `banner`, a landmark role.

When a `<header>` is nested in  `<main>`, `<article>`,  or `<section>`, it just identifies it as the header for that section and isn't a landmark.


## `<nav>`

The `<nav>` element identifies content as navigation.

As this `<nav>` is nested in the site heading, it is the main navigation for the site.

If it was nested in an `<article>` or `<section>`, it would be internal navigation for that section only.


## `<footer>`

```html
<footer>
  <p>&copy;2022 Machine Learning Workshop, LLC. All rights reserved.</p>
</footer>
```

Similar to `<header>`, whether the footer is a landmark depends on where the footer is nested.

When it is the site footer, it is a landmark, and should contain the site footer information you want on every page (a copyright statement, contact information, and links to your privacy and cookie policies). The implicit `role` for the site footer is `contentinfo`. 

Otherwise, the footer has no implicit role and is not a landmark.

In this screenshot, there are two footers: one in an `<article>` and one top level. The top level footer is a landmark with the implicit role of `contentinfo`. The other footer isn't a landmark. Chrome shows it as `FooterAsNonLandmark`; Firefox shows it as `section`.

![](https://web-dev.imgix.net/image/kheDArv5csY6rvQUJDbWRscckLr1/A6uTEfG3muxX7namzXW5.png?auto=format&w=1600)

*Let's say you have a blog. The blog has a site footer with an implicit `contentinfo` role. Each blog post can also have a `<footer>`. On your blog's main landing page, the browser, search engine, and screen reader know the main footer is the top-level footer, and that all the other footers are related to the posts in which they are nested.*

Navigation elements within a footer don't have specific requirements. Generally, the footer will include corporate links, such as legal statements, about the company, and careers, and can lead to external sources, such as social media icons.


## `<main>`

- There's a single `<main>` landmark element.
- The `<main>` element identifies the main content of the document.
- There should be only one `<main>` per page.


## `<aside>`

- The `<aside>` is for content that is indirectly or tangentially related to the document's main content.
- The `<aside>` is also a landmark, with the implicit role of `complementary`.
- The `<aside>` content is often placed as a sidebar in a document.

Information that can be placed within the `<aside>` element:
- Endnotes
- Comments
- Lists of terms
- Reference information
- A collection of links
- How many people read the article
- Author of the article
- Pull-quotes


## `<article>`

The `article` tag is used for wrapping an **autonomous** content on a page.

> A content is autonomous if it can be removed from the page and put on some another page.

*Think of an article as you would an article in a newspaper.  In print, a news article about Jacinda Ardern, Prime Minister of New Zealand, might only appear in one section, maybe world news. On the paper's website, that same news article might appear on the home page, in the politics section. The article may also appear on other sites, like Pocket or Yahoo News!*

*If you are writing a blog, as in our second example, each post should be in an `<article>` nested in `<main>`.*


## `<section>`

The `article` tag can contain several `section` tags inside it.

The `section` tag wraps logical groups of related content (e.g. a chapter of an article).

Sections should have a heading.

A `<section>` isn't a landmark unless it has an accessible name; if it has an accessible name, the implicit role is `region`.

```html
<main>
    <article>
        <h1>JavaScript Basics</h1>
        <p>JavaScript is a rich and expressive language...</p>
        <section>
            <h2>Syntax Basics</h2>
            <p>Understanding statements, variable naming, whitespace...</p>
        </section>
        <section>
            <h2>Operators</h2>
            <p>Operators allow you to manipulate values...</p>
        </section>
        <section>
            <h2>Conditional Code</h2>
            <p>Sometimes you only want to run a block of code under certain conditions...</p>
        </section>
    </article>
</main>
```