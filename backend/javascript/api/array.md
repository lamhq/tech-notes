# Array

## Determining the location of an item in an array

```ts
arr.indexOf(item)
```


## Removing all instances of a value from an array (modify the original array)

```ts
// Modifies the original array
removeWithoutCopy = function(arr, item) {
  let idx = 0;
  while(idx < arr.length) {
    if (item === arr[idx]) {
      arr.splice(idx, 1)
    } else {
      idx+=1;
    }
  }
}
```


## Calculating sum of an array

```ts
arr.reduce((prev, cur) => prev+cur, 0);
```


## Adding an item at the beginning of an array.

```tsx
arr.splice(0, 0, item);
```


## Joining two arrays

```tsx
arr1.concat(arr2)
```
