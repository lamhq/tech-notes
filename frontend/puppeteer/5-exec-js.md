# Evaluate JavaScript

Puppeteer allows evaluating JavaScript functions in 
the context of the page driven by Puppeteer.

The function gets stringified by Puppeteer, sent to the target page over Chrome DevTools protocol and evaluated there.

The function cannot access scope variables in your script.

```ts
// Import puppeteer
import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto('YOUR_SITE');

  // Evaluate JavaScript
  const three = await page.evaluate(() => {
    return 1 + 2;
  });

  console.log(three);

  // Close browser.
  await browser.close();
})();
```


## Return types

If the function/script returns an object, it is serialized to JSON and reconstructs it on the script side.

To return DOM elements, use `evaluateHandle`:

```tsx
const body = await page.evaluateHandle(() => {
  return document.body;
});
console.log(body instanceof ElementHandle); // true
```

See the [API documentation](https://pptr.dev/api) for more details about what methods are available for handles.


## Passing arguments

```tsx
const three = await page.evaluate(
  (a, b) => {
    return a + b;
  },
  1,
  2
);
```

The arguments can primitive values or `JSHandle`s.