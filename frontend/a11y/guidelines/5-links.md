# Link

## States

Different link states help users interact with the links.
- A visited state can help a person with short-term memory loss to understand which content has been read.
- A hover state can help a person with reduced muscle control to know when to click.
- A focused link helps keyboard users to know which link they are about to activate.

To make sure that all link states are accessible, we must remember these tips:

- Links should be **underlined**. Removing the underline from a link in body text is a bad idea most of the time.
- All states must have sufficient **contrast**. A focused link must have sufficient contrast to the unfocused state.
- A clear **hover** state is helpful for everyone, especially people with motor impairments.


## Text

Write link text using descriptive phrases that provide context for the material that you're linking to.

A link text should explain clearly what information the reader will get by clicking on that link.

An accessible link text is a text that makes sense without any context.

Good:
- [Find out more about the HTML language](#)
- Read more about [how to eat healthy](#)
- [Buy tickets to Mars here](#)

Bad:
- [Click here](#)
- [Read more](#)
- Buy tickets to Mars [here](#)


## Logo

If your logo is an image wrapped by a link. Add `aria-label="Website front page"` on the `<a>` tag. The label should explain clearly what information the reader will get by clicking on that link.


## Skip link

People use skip links to reach main content or other important sections easier and faster.

Skip link is the first interactive element on a page. It takes the user to the main content, past the global elements like the logo, search and navigation. It is almost always hidden until it receives focus.

![](https://www.w3schools.com/accessibility/img_webaim_skip.png)

To access the skip link:

- Open the website [WebAIM](https://webaim.org/) on your desktop or laptop.
- Press the tab key. 
- Press enter to follow the link.

### HTML

```html
<header>
<a href="#main" class="skip">Skip to main content</a>
…
</header>
…
<main id="main">
```

### CSS

The skip link default is outside the browser. The `1px` size and the `overflow: hidden;` are for special cases where user has deactivated absolute positioning.

```css
.skip {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

When the link is focused, it has to be visible. 

```css
.skip:focus {
  position: static;
  width: auto;
  height: auto;
}
```
