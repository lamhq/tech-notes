# daisyUI themes

daisyUI comes with a number of themes. Each theme defines a set of colors which will be used on all daisyUI elements. 

To use a theme, add its name in `tailwind.config.js`.

```js
module.exports = {
  //...
  daisyui: {
    themes: ["cupcake", "dark", "cmyk"],
  },
}
```

- `cupcake` will be the default theme for light mode
- `dark` will be the default theme for dark mode
- `cmyk` can be applied on any HTML tag with `data-theme='cmyk'`


Activate it by adding `data-theme` attribute to HTML tag:

```html
<html data-theme="cupcake"></html>
```


## Changing theme

I suggest using [theme-change](https://github.com/saadeghi/theme-change), so you can switch themes and save selected theme in local storage.


## List of themes

Check [here](https://daisyui.com/docs/themes/#:~:text=in%20local%20storage.-,List%20of%20themes,-Try%20them%3A).


## Use a theme only for a section of a page

Add `data-theme='THEME_NAME'` to any element and everything inside will have your theme.

```html
<html data-theme="dark">
  <div data-theme="light">
    This div will always use light theme
    <span data-theme="retro">This span will always use retro theme!</span>
  </div>
</html>
```


## Add a new custom theme

```js {{ filename: 'tailwind.config.js' }}
module.exports = {
  //...
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#a991f7",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",

          // optional CSS variable
          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs          
        },
      },
      "dark",
      "cupcake",
    ],
  },
}
```

## Custom CSS for a daisyUI theme

You can apply custom style to a daisyUI themes using CSS:

```css
[data-theme="mytheme"] .btn {
  border-width: 2px;
  border-color: black;
}
```

You can write custom style for your elements only for a specific theme. In this example, `.btn-twitter` class only will have this style on light theme.

```js
module.exports = {
  //...
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          ".btn-twitter": {
            "background-color": "#1EA1F1",
            "border-color": "#1EA1F1",
          },
          ".btn-twitter:hover": {
            "background-color": "#1C96E1",
            "border-color": "#1C96E1",
          },
        },
      },
    ],
  },
}
```


## Customize an existing theme

```js
module.exports = {
  //...
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "blue",
          "primary-focus": "mediumblue",
        },
      },
    ],
  },
}
```
