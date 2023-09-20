# Styling and CSS

## Importing CSS files

To add global CSS for all your stories, import it in `.storybook/preview.js`.

If your component files import their CSS files, this will work too.


## CSS processors

If you're using Vite as your builder, you're covered! Vite supports Sass and PostCSS out-of-the-box.


## CSS-in-JS

CSS-in-JS libraries are designed to use basic JavaScript, and they often work in Storybook without any extra configuration. 


## Adding webfonts

If you need webfonts to be available, you may need to add some code to the `.storybook/preview-head.html` file. 
