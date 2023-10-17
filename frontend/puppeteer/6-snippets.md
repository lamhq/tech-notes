# Snippets

## Navigating to a URL

```javascript
await page.goto('https://example.com');
await page.goBack();
await page.goForward();
```

## Performing a Search

```javascript
await page.type('input[name="q"]', 'Puppeteer');
await page.keyboard.press('Enter');
await page.waitForNavigation();
```

## Interacting with Forms

```javascript
await page.type('input[name="username"]', 'yourUsername');
await page.type('input[name="password"]', 'yourPassword');
await page.click('input[type="submit"]');
```

## Scraping Text

```javascript
const element = await page.$('.some-selector');
const text = await page.evaluate(element => element.textContent, element);
console.log(text);
```

## Clicking a Button

```javascript
await page.click('.button-selector');
```

##  Waiting for Elements

```javascript
await page.waitForSelector('.some-element');
```

## Handling Navigation Events

```javascript
page.on('response', (response) => {
  // Handle network responses here
});

page.on('console', (msg) => {
  console.log(`Page log: ${msg.text()}`);
});
```

## Emulating a Mobile Device

```javascript
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone X'];
await page.emulate(iPhone);
```

## PDF Generation

```javascript
await page.pdf({ path: 'page.pdf', format: 'A4' });
```

## Taking a Screenshot

```javascript
await page.screenshot({ path: 'screenshot.png' });
```

## Intercepting and Modifying Network Requests

```javascript
await page.setRequestInterception(true);
page.on('request', request => {
  if (request.isInterceptResolutionHandled()) return;
  if (
    request.url().endsWith('.png') ||
    request.url().endsWith('.jpg')
  )
    request.abort();
  else request.continue();
});
```

## Handling Authentication Dialogs

```javascript
page.authenticate({ username: 'yourUsername', password: 'yourPassword' });
```

## Working with Cookies

```javascript
const cookies = await page.cookies();
console.log(cookies);

await page.setCookie({ name: 'myCookie', value: 'cookieValue', domain: 'example.com' });
```

## Manipulating the Viewport

```javascript
await page.setViewport({ width: 1280, height: 800 });
```

## Mouse Actions

```javascript
await page.mouse.move(100, 100);
await page.mouse.down();
await page.mouse.move(200, 200);
await page.mouse.up();
```
