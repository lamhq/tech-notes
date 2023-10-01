# ARIA and HTML

HTML and ARIA (Accessible Rich Internet Applications) play important roles in making digital products accessible, especially when it comes to assistive technology (AT) such as screen readers.


## Introduction to ARIA

ARIA is a set of attributes you can add to HTML elements to increase their accessibility.

These attributes communicate role, state, and property to assistive technologies via accessibility APIs found in modern browsers. 


## The accessibility tree

The accessibility tree is created by the browser and based on the standard Document Object Model (DOM) tree.

Like the DOM tree, the accessibility tree contains objects representing all the markup elements, attributes, and text nodes. 

The accessibility tree is also used to provide a representation that assistive technologies can understand.

![](https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/G1IWcJBT9tfZq4xCKTqq.jpg?auto=format&w=1150)

ARIA doesn't change an element's functionality or visual appearance.

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

### Rule 1: Don't use ARIA

Adding ARIA to an element does not inherently make it more accessible, due to the improper implementation of the ARIA attributes. 

When in doubt, use [semantic HTML elements](https://web.dev/learn/html/semantic-html/).

*Don't:*

```html
<a role="button">Submit</a>
```

*Do:*

```html
<button>Submit</button>
```


### Rule 2: Don't add (unnecessary) ARIA to HTML #

In most circumstances, HTML elements work well out of the box and do not need additional ARIA added to them. In fact, developers using ARIA often have to add additional code to make the elements functional in the case of interactive elements.

*Don't:*

```html
<h2 role="tab">Heading tab</h2>
```

*Do:*

```html
<div role="tab"><h2>Heading tab</h2></div>
```

### Rule 3: Always support keyboard navigation

All interactive (not disabled) ARIA controls must be keyboard 
accessible. You can add `tabindex= "0"` to any element that needs 
a focus that doesn't normally receive keyboard focus.

Avoid [using tab indexes with positive integers](https://www.scottohara.me/blog/2019/05/25/tabindex.html)
whenever possible to prevent potential keyboard focus order issues.

*Don't:*

```html
<span role="button" tabindex="1">Submit</span>
```

*Do:*

```html
<span role="button" tabindex="0">Submit</span>
```

### Rule 4: Don't hide focusable elements

Don't add `role= "presentation"` or `aria-hidden= "true"` to 
elements that need to have focus&mdash;including elements with a 
`tabindex= "0"`.

When you add these roles/states to elements, it sends a message 
to the AT that these elements are not important and to skip over 
them. This can lead to confusion or disrupt users attempting to 
interact with an element.

*Don't:*

```html
<div aria-hidden="true"><button>Submit</button></div>
```

*Do:*

```html
<div><button>Submit</button></div>
```


### Rule 5: Use accessible names for interactive elements

Ensure that all elements have an [accessible name](https://www.w3.org/TR/accname-1.1/) for people using AT devices.

For each of the following code samples, the accessible name is "Red leather
boots."

```html
<!-- A plain link with text between the link tags. -->
<a href="shoes.html">Red leather boots</a>

<!-- A linked image, where the image has alt text. -->
<a href="shoes.html"><img src="shoes.png" alt="Red leather boots"></a>

<!-- A checkbox input with a label. -->
<input type="checkbox" id="shoes">
<label for="shoes">Red leather boots</label>
```

There are many ways to check an element's accessible name, including inspecting the accessibility tree using [Chrome DevTools](https://developer.chrome.com/blog/full-accessibility-tree/) or testing it with a screen reader.


## ARIA in HTML

Don't override default HTML roles, reduce redundancy, and be aware of unintended side effects.

*Don't (Assigned the wrong role):*

```html
<a role="heading">Read more</a>
```

*Don't (Redundant role):*

```html
<ul role="list">...</ul>
```

*Don't (Potential side effects):*

```html
<details>
  <summary role="button">more information</summary>
  ...
</details>
```