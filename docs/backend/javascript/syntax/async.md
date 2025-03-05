# Async Operation

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


## Sequentialize async operations

Require ES9.

```js
function delay(milisecond) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved after ${milisecond} milisecond(s)`);
    }, milisecond); // Convert seconds to milliseconds
  });
}

async function process() {
  const nums = [100, 200, 50];

  for (const url of nums) {
    const result = await delay(url);
    console.log(result);
  }

  console.log('done');
}

process();
```
