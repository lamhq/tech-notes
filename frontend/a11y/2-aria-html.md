# ARIA and HTML

HTML and ARIA (Accessible Rich Internet Applications) play important roles in making digital products accessible, especially when it comes to assistive technology (AT) such as screen readers.

Both are used to convert content into an alternate format, such as Braille or Text-to-Speech (TTS).


## Introduction to ARIA

ARIA is not a true programming language but a set of attributes you can add to HTML elements to increase their accessibility.

These attributes communicate role, state, and property to assistive technologies via accessibility APIs found in modern browsers. 


## The accessibility tree

ARIA modifies incorrect or incomplete code to create a better experience for those using AT by changing, exposing, and augmenting parts of the accessibility tree.

The accessibility tree is created by the browser and based on the standard Document Object Model (DOM) tree.

Like the DOM tree, the accessibility tree contains objects representing all the markup elements, attributes, and text nodes. 

The accessibility tree is also used by platform-specific accessibility APIs to provide a representation that assistive technologies can understand.

![](https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/G1IWcJBT9tfZq4xCKTqq.jpg?auto=format&w=1150)

ARIA doesn't change an element's functionality or visual appearance. Only AT users will notice differences between a digital product with ARIA and one without it. 

Developers are responsible for making the appropriate code and styling changes to make an element as accessible as possible.

The three main features of ARIA are roles, properties, and states/values.

**Roles** define what an element is or does on the page or app:

```html
<div role="button">Self-destruct</div>
```

**Properties** express characteristics or relationships to an object.

```html
<div role="button" aria-describedby="more-info">Self-destruct</div>

<div id="more-info">This page will self-destruct in 10 seconds.</div>
```

**States/values** define the current conditions or data values associated with the element.

```html
<div role="button" aria-describedby="more-info" aria-pressed="false">
  Self-destruct
</div>

<div id="more-info">
  This page will self-destruct in 10 seconds.
</div>
```

Chrome DevTools has created a way to [see the full accessibility tree](https://developer.chrome.com/blog/full-accessibility-tree/) making it easier for developers to understand how their code impacts accessibility.


## When to use ARIA

https://web.dev/learn/accessibility/aria-html/#when-to-use-aria

https://github.com/GoogleChrome/web.dev/blob/main/src/site/content/en/learn/accessibility/aria-html/index.md?plain=1