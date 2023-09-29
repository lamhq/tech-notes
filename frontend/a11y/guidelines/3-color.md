# Color

## Color Contrast

Text and graphical components on a web page need good contrast so that we make sure that it is perceivable for users.

### Contrast ratio

We measure contrast between text or graphics against the background color. This is called **contrast ratio**.

*A white text on a white background has a contrast ratio of 1. This is impossible to perceive.*

*Black text on a white background has a contrast ratio of 21.*

A high contrast is usually more readable than a low contrast. According to Apple, we should strive for a minimum of **4.5**, although 7 is preferred. 


### Measure

One way to measure the color contrast is to use a tool like [Contrast Ratio](https://contrast-ratio.com/).


### Text on images

To measure contrast on text on top of a background image, we need to find the brightest or darkest part of the image. If the text is bright, look for the brightest part and vice versa.


### Element states

Any interactive component has different states – hover, focus, active, unvisited, visited and deactivated. 

- Color contrast needs to be good for all states.
- Change of contrast from unfocused to focused state is at least 3.


## Color meaning

Do not use color as the **only** visual indicator of a meaning.

### Link example

The most common example of this is to style links without underline or border.

Browsers underline hypertext links by default. It is possible to remove the underline using Cascading Style Sheets (CSS), but this is a bad idea most of the time. Users are accustomed to seeing links underlined.

Todo:

- Add underline to links. Or, do not remove them. Keep in mind that they can reduce readability.
- To improve readability, we can use CSS properties like `text-underline-offset` and `text-decoration-color`. 

![](https://www.w3schools.com/accessibility/img_wikipedia_underline_improved.png)


### Another example

The tool [Coolors Color Contrast Checker](https://coolors.co/contrast-checker/ffffff-a2b9bc) uses three methods to tell us whether or not a color combination is good:

- The red color tells us that the contrast is bad.
- The text Very poor tells us that the contrast is b… very poor.
- 1 of 5 stars tells us that this is really bad.

![](https://www.w3schools.com/accessibility/img_coolors.png)
