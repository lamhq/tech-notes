# Puppeteer

## Features

- Runs in headless mode or full Chrome.
- Generate screenshots and PDFs of pages.
- Crawl a SPA and generate pre-rendered content.
- Automate form submission, UI testing, keyboard input, etc.
- Create an automated testing environment using the latest JavaScript and browser features.
- Capture a timeline trace of your site to help diagnose performance issues.
- Test Chrome Extensions.


## Installation

```shell
pnpm i puppeteer
```

When you install Puppeteer, it automatically downloads a recent version of Chrome for Testing to the `$HOME/.cache/puppeteer` folder.

If you deploy a project using Puppeteer to a hosting provider, you might need to reconfigure the location of the cache to be within your project folder


## Configuration

Configuration files: 
- `.puppeteerrc.cjs`
- `.puppeteer.config.cjs`
- `.puppeteerrc.js`

```tsx
const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
```

## Example

```tsx
import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto('YOUR_SITE');

  // Query for an element handle.
  const element = await page.waitForSelector('div > .class-name');

  // Do something with element...
  await element.click(); // Just an example.

  // Dispose of handle
  await element.dispose();

  // Close browser.
  await browser.close();
})();
```
