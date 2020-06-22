# Navigation and Sidebars

## Getting URL of a document

For example, creating an empty file such as `docs/getting-started.md` will enable the new page URL as `/docs/getting-started.html`.

Suppose you add this to your document:

```yaml
id: intro
title: Getting Started
---
My new content here..
```

If you set the `id` field in the markdown header of the file, the doc will then be accessed from a URL of the form `/docs/intro.html`.

> You need an `id` field to be able to add the document to the sidebar.


## Referencing between Documents

If you want to reference another document in your `docs` directory, then you just use the name of the document you want to reference.

For example, If you are in `doc2.md` and you want to reference `doc1.md`:

```md
I am referencing a [document](doc1.md).
```


## Sidebar

### Adding Documents

You configure the contents of the sidebar, and the order of its documents, in the `website/sidebars.json` file.

Within `sidebars.json`, add the `id` you used in the document header to existing sidebar/category. In the below case, `docs` is the name of the sidebar and `Getting Started` is a category within the sidebar.

```js
{
  "docs": {
    "Getting Started": [
      "getting-started"
    ],
    ...
  },
  ...
}
```


### Collapsible Categories

```js
// siteConfig.js
{
  docsSideNavCollapsible: true,
  ...
}
```


## Navigation Bar

### Adding documents

```js
// siteConfig.js
{
  headerLinks: [
    ...
    { doc: 'my-examples', label: 'Examples' },
    ...
  ],
  ...
}
```


### Adding custom pages

if we have a page within `website/pages/help.js`, we can link to it by adding the following:

```js
{
  headerLinks: [
    ...
    { page: 'help', label: 'Help' },
    ...
  ],
  ...
}
```

### Adding External Links

```js
// siteConfig.js
{
  headerLinks: [
    ...
    { href: 'https://github.com/facebook/docusaurus', label: 'GitHub' },
    ...
  ],
  ...
}
```

### Adding Search bar

```js
// siteConfig.js
{
  headerLinks: [
    { doc: 'foo', label: 'Foo' },
    { search: true },
    { doc: 'bar', label: 'Bar' },
  ],
  ...
}
```

### Adding Languages Dropdown

```js
{
  headerLinks: [
    { doc: 'foo', label: 'Foo' },
    { languages: true },
    { doc: 'bar', label: 'Bar' },
  ],
  ...
}
```


## Enabling On-Page Navigation

```js
{
  onPageNav: 'separate',
  ...
}
```