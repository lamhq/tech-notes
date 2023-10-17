# Launching

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Your code here

  await browser.close();
})();
```

##  Using new Headless Mode

By default Puppeteer launches Chrome in old Headless mode.
You can enable new headless mode:

```javascript
const browser = await puppeteer.launch({ headless: true }); // For headless mode
```

## Headful mode

```tsx
const browser = await puppeteer.launch({headless: false});
```

## Use a different version of Chrome

By default, Puppeteer downloads and uses a specific version of Chrome. To use Puppeteer with a different version of Chrome or Chromium, pass in the executable's path:

```tsx
const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
```
