# HTML Semantics

## What does Semantic in HTML mean?

Semantic means "relating to meaning". Writing semantic HTML means using HTML elements to structure your content based on each element's meaning, not its appearance.
 
For instance, using the `<div>` tag doesn’t suggest the content it will carry, however using the `<p>` tag suggests it can be used to hold paragraph information. 

The purpose of using semantic tags in HTML is to organize your HTML script based on the meaning of the HTML element rather than how it looks.

![](https://browserstack.wpenginepowered.com/wp-content/uploads/2023/04/non-semantic-vs-semanitc-synta-e1682414501770-768x503.png)


## Why write semantic HTML?

By using semantic HTML, this provides a number of advantages, including SEO, Accessibility, Compatibility, and Code maintainability.  

### SEO

HTML semantic elements are now included in Google’s algorithms. Because search engines utilize HTML to decipher the content and goal of a webpage, its placement of semantic keywords has an impact on the webpage’s ranking.


### Accessibility

It is easier for persons with disabilities to navigate your website if you have appropriately laid up a foundation of semantic HTML.


### Browser Compatibility

HTML semantic tags make sure that your code can be integrated with future technologies.

Additionally, each browser interacts with semantic elements differently, semantic elements make it simple to utilize larger coverage of your website across platforms.


## Accessibility object model (AOM)

As the browser parses the content received, it builds the document object model (DOM) and the CSS object model (CSSOM). It then also builds an accessibility tree.

Assistive devices, such as screen readers, use the AOM to parse and interpret content.

The DOM is a tree of all the nodes in the document. The AOM is like a semantic version of the DOM.

The following code snippet use semantic elements:

```html
<header>
  <h1>Three words</h1>
  <nav>
    <a>one word</a>
    <a>one word</a>
    <a>one word</a>
    <a>one word</a>
  </nav>
</header>
<main>
  <header>
    <h1>five words</h1>
  </header>
  <section>
    <h2>three words</h2>
    <p>forty-six words</p>
    <p>forty-four words</p>
  </section>
  <section>
    <h2>seven words</h2>
    <p>sixty-eight words</p>
    <p>forty-four words</p>
  </section>
</main>
<footer>
  <p>five words</p>
</footer>
```

Chrome's AOM shows this as follows:

![](https://web-dev.imgix.net/image/kheDArv5csY6rvQUJDbWRscckLr1/svdGvQhpNlk7UiFgoCpH.png?auto=format&w=1164)

It's pretty clear that semantic element usage helps accessibility, and using non-semantic elements reduces accessibility.

You can [inspect the AOM in developer tools](https://developer.chrome.com/docs/devtools/accessibility/reference/#explore-tree).


### Landmarks

HTML5 elements such as `main`, `nav`, and `aside` act as landmarks, or special regions on the page to which a screen reader can jump.

Landmark tags are used to define major sections of your page.


### The `role` attribute

The `role` attribute describes the role an element has in the context of the document. The `role` attribute is a global attribute—meaning it is valid on all elements.

Semantic elements each have an implicit role, some depending on the context.

For above HTML snippet, The Chrome screenshot lists these elements' [ARIA  roles](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Roles): 
- `<main>` is `main`
- `<nav>` is `navigation`
- `<footer>` as it was the footer of the document, is `contentinfo`.
- When `<header>` is the header for the document, the default role is `banner`, which defines the section as the global site header.
- When a `<header>` or `<footer>` is nested within a sectioning element, it is not a landmark role.

The element's role enables a user to access the content they seek quickly and, possibly, more importantly, the role informs the screen reader user how to interact with an interactive element once it has focus.

Non-semantic elements don't have implicit roles. We can make the non-semantic version semantic by assigning each element a role:

```html
<div role="banner">
  <span role="heading" aria-level="1">Three words</span>
  <div role="navigation">
    <a>one word</a>
    <a>one word</a>
    <a>one word</a>
    <a>one word</a>
  </div>
</div>
```
