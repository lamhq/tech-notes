# Query Selectors

```tsx
const element = await page.waitForSelector('div > .class-name');
```

## `>>>` and `>>>>` combinators

`>>>`:
  - called **deep descendent**
  - going into every shadow host under a node

`>>>>`:
- called **deep** combinators. 
- going into the immediate one (if the node is a shadow host).

Suppose we have the markup

```html
<custom-element>
  <template shadowrootmode="open">
    <slot></slot>
  </template>
  <custom-element>
    <template shadowrootmode="open">
      <slot></slot>
    </template>
    <custom-element>
      <template shadowrootmode="open">
        <slot></slot>
      </template>
      <h2>Light content</h2>
    </custom-element>
  </custom-element>
</custom-element>
```

- `custom-element >>> h2` will return `h2`
- `custom-element >>>> h2` will return nothing since the inner `h2` is in a deeper shadow root.


## Text selectors `-p-text`

Text selectors will select deepest elements containing the given text, even within (open) shadow roots.

```tsx
const element = await page.waitForSelector('div ::-p-text(My name is Jun)');

// You can also use escapes.
const element = await page.waitForSelector(
  ':scope >>> ::-p-text(My name is Jun \\(pronounced like "June"\\))'
);

// or quotes
const element = await page.waitForSelector(
  'div >>>> ::-p-text("My name is Jun (pronounced like \\"June\\")"):hover'
);
```


## XPath selectors `-p-xpath`

XPath selectors will use the browser's native [`Document.evaluate`](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate) to query for elements.

```ts
const element = await page.waitForSelector('::-p-xpath(h2)');
```

## ARIA selectors (`-p-aria`)

ARIA selectors can be used to find elements with a given ARIA label. These labels are computed using Chrome's internal representation.

```ts
const node = await page.waitForSelector('::-p-aria(Submit)');
const node = await page.waitForSelector(
  '::-p-aria([name="Click me"][role="button"])'
);
```


## Custom selectors

Define a query handler for `getById` selectors:

```tsx
Puppeteer.registerCustomQueryHandler('getById', {
  queryOne: (elementOrDocument, selector) => {
    return elementOrDocument.querySelector(`[id="${CSS.escape(selector)}"]`);
  },
  // Note: for demonstation perpose only `id` should be page unique
  queryAll: (elementOrDocument, selector) => {
    return elementOrDocument.querySelectorAll(`[id="${CSS.escape(selector)}"]`);
  },
});
```

You can now use it as following:

```tsx
const node = await page.waitForSelector('::-p-getById(elementId)');
// OR used in conjunction with other selectors
const moreSpecificNode = await page.waitForSelector(
  '.side-bar ::-p-getById(elementId)'
);
```
