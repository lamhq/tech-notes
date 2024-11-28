# HTML Template

## Set Template

you can use `html.template` config to define the path to the custom HTML template:
```js
export default {
  html: {
    template: './static/index.html',
  },
};
```


## Set Page Title

you can set corresponding titles for different pages based on the entry name:
```js
export default {
  html: {
    title({ entryName }) {
      const titles = {
        foo: 'Foo',
        bar: 'Bar',
      };
      return titles[entryName];
    },
  },
};
```


## Set Page Icon

```js
export default {
  html: {
    favicon: './src/assets/icon.png',
  },
};
```

Set home screen icon (mobile):
```js
export default {
  html: {
    appIcon: {
      name: 'My Website',
      icons: [
        { src: './src/assets/logo-192.png', size: 192 },
        { src: './src/assets/logo-512.png', size: 512 },
      ],
    },
  },
};
```


## Set Meta Tags

```js
export default {
  html: {
    meta: {
      description: 'a description of the page',
    },
  },
};
```


## Injecting Tags

You can insert any tags into the output HTML files by configuring `html.tags`.

One use case is injecting third-party scripts:
```js
export default {
  html: {
    tags: [
      { tag: 'script', attrs: { src: 'https://cdn.example.com/my-script.js' } },
    ],
  },
};
```

The generated HTML file looks like this:
```html
<html>
  <head>
    <script src="https://cdn.example.com/my-script.js"></script>
    <!-- some other headTags... -->
  </head>
  <body>
    <!-- some other bodyTags... -->
  </body>
</html>
```
