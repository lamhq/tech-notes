# Searching

Once your website is online, you can [submit it to DocSearch](https://community.algolia.com/docsearch/). Algolia will then send you credentials you can add to your `siteConfig.js`.


## Enabling the Search Bar

```js
// siteConfig.js
const siteConfig = {
  ...
  algolia: {
    apiKey: 'my-api-key',
    indexName: 'my-index-name',
    appId: 'app-id', // Optional, if you run the DocSearch crawler on your own
    algoliaOptions: {} // Optional, if provided by Algolia
  },
  ...
};
```


## Adding Search bar to the top navigation bar

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


## Customizing the placeholder

```js
const siteConfig = {
  ...
  algolia: {
    ...
    placeholder: 'Ask me something'
  },
};
```


## Disabling the Search Bar

To disable the search bar, comment out (recommended) or delete the `algolia` section in the `siteConfig.js` file.

Also, if you have customized the location of the search bar in `headerLinks`, set `search: false`.