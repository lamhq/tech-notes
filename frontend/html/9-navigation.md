# Navigation

```html
<header>
    <img src="logo.png" alt="logo"/>
    <nav>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="contact.html">Contact</a>
        <a href="about.html">About Us</a>
    </nav>
</header>
```

## Types of navigation

Named anchors within text linking to other pages within the same website are considered **local navigation**.

The navigation section leading to the top-level pages of the website which is found on every page is called **global navigation**. Global navigation can be displayed in several different ways, including navigation bars, drop-down menus, and flyout menus. 

Local navigation that consists of a series of links displaying the hierarchy of the current page in relation to the site's structure, or the pages the user followed to get to the current page, is called a **breadcrumb**.

A page's **table of contents** is another type of local navigation.

A page containing hierarchical links to every single page on a site is called a **site map**.

The navigation menu can be put anywhere on a page. However, it shouldn't be put inside `main`, unless the navigation is specific for that page.

## "Skip to content" link

For improved usability and accessibility, it's important to let users bypass the blocks of content that are repeated on every page.

The skip link is included so when a keyboard user hits `tab` on load, they can quickly skip to the main content of the site—avoiding
having to tab through extensive linkages.

The first element on the page is an internal link:

```html
<a href="#main" class="skip-link button">Skip to main</a>
```

## Table of contents

[Web.dev Table of contents](https://web.dev/learn/html/navigation/#table-of-contents).

```html
<nav aria-labelledby="tocTitle">
  <p id="tocTitle">On this page</p>
  <ul role="list">
    <li>
      <a href="#skip">Skip to content link</a>
    </li>
    <li>
      <a href="#toc">Table of contents</a>
    </li>
    <li>
      <a href="#bc">Page breadcrumbs</a>
    </li>
    <li>
      <a href="#ln">Local navigation</a>
    </li>
    <li>
      <a href="#global">Global navigation</a>
    </li>
  </ul>
</nav>
```


## Page breadcrumbs

Breadcrumbs provide secondary navigation to help users understand where they are on a website.

They generally show the URL hierarchy of the current document and the location of the current page in the site structure.

Breadcrumbs help users navigate and understand the organization of your site, allowing them to quickly navigate anywhere up to any ancestor sections without having to step back through each prior page visited to get to the current page using `back` functionality.

Breadcrumbs are not for linear steps. For example, a list of the path the user followed to get to the current page or the
list of steps followed up to this point in a recipe can be nested within a `<nav>`,  but should not be labeled as a breadcrumb.

```html
<nav aria-label="breadcrumbs">
  <ul role="list">
    <li>
      <a href="/">
        Logo
      </a>
    </li>
    <li>
      <a href="/learn/">Learn</a>
    </li>
    <li>
      <a href="/learn/html">Learn HTML!</a>
    </li>
  </ul>
</nav>
```

This breadcrumb follows best practices. It uses the `<nav>` element, a landmark role, so assistive technology presents the breadcrumbs as a navigational element on the page.
The accessible name of "breadcrumbs", provided with the `aria-label`, differentiates it from the other navigation landmarks in the current document.

### Current page

When the current page is included in a
breadcrumb, the text should preferably not be a link, and `aria-current="page"` should be included on the current page's
list item.

```html
<nav aria-label="breadcrumbs">
  <ol role="list">
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/learn/">Learn</a>
    </li>
    <li>
      <a href="/learn/html">Learn HTML!</a>
    </li>
    <li aria-current="page">
      Navigation
    </li>
  </ol>
</nav>
```


## Local navigation

[Web.dev Local navigation](https://web.dev/learn/html/navigation/#local-navigation).



## Global navigation

Global navigation is the navigation section leading to the top-level pages of the website that is the same on every page of a site.

A site's global navigation may also be made up of tabs that open nested lists of links that link to all the subsections of a site or other menus. It may include titled sections, buttons, and search widgets.

What is required is that the navigation appears on every page, and is the same on every page; with `aria-current="page"` on any links to the current page, of course.

Global navigation provides a consistent means of traveling anywhere in the application or website.