# ES7 Syntax

## Async / Await

```js
async function schrodinger() {
  return new Promise((resolve, reject) => {
    const result = Math.random > 0.5;
    setTimeout(() => {
      return result ? resolve(‘alive’) :
        reject(‘dead’)
    });
  });
}

try {
  console.log(await schrodinger());
  // -> ‘alive’
} catch (err) {
  console.log(err);
  // -> ‘dead’
}
```

Perform asynchronous operations in sequence:
```js
async function processArray(array) {
  for (const item of array) {
    await asyncOperation(item);
  }
}

async function asyncOperation(item) {
  // Simulate async operation, like fetching data or writing to a database
  return new Promise(resolve => setTimeout(() => {
    console.log(`Processed ${item}`);
    resolve();
  }, Math.floor(Math.random() * 1001)));
}

const array = [1, 2, 3, 4, 5];
processArray(array).then(() => console.log('All items processed'));
```


## Export

```js
export function sumTwo(a, b) {
  return a + b;
}

export const EULER = 2.7182818284

let stuff = {
  sumTwo,
  EULER
}

// export default stuff
export { stuff as default }
```


## Import

```js
import { EULER } from ‘./myexports’
import { sumTwo as sum } from './component.js';

import * as stuff from ‘./myexports’
// equivalent to
import stuff from ‘./myexports’
// { sumTwo, EULER }
```


### Import a module for its side effects only

Used when importing css files

__main.js__

``` javascript
import './style.css';
```