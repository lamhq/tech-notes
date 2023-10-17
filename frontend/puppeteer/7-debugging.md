# Debugging

## Slow down Puppeteer

Slows down Puppeteer operations by a specified amount of milliseconds.

```tsx
const browser = await puppeteer.launch({
  headless: false,
  slowMo: 250, // slow down by 250ms
});
```

## Client side

### Capture `console.*` output

```tsx
page.on('console', msg => console.log('PAGE LOG:', msg.text()));

await page.evaluate(() => console.log(`url is ${location.href}`));
```

### Use the debugger in the browser

1. Set [`devtools`](../api/puppeteer.browserlaunchargumentoptions) to
   `true` when launching Puppeteer:

   ```ts
   const browser = await puppeteer.launch({devtools: true});
   ```

2. Add `debugger` inside any client code you want debugged. For example,

   ```ts
   await page.evaluate(() => {
     debugger;
   });
   ```

   The Browser will now stop in the location the `debugger` word is found in
   debug mode.
