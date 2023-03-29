# Array

## Declare array

```java
// declares an array of integers
int[] anArray;

// create an array of integers
anArray = new int[10];

// create and initialize an array
int[] anOtherArray = { 100, 200, 300 };

// create and initialize a multidimensional array
String[][] names = {
    {"Mr. ", "Mrs. ", "Ms. "},
    {"Smith", "Jones"}
};
```


## Array Manipulations

Useful operations provided by methods in the java.util.Arrays class:

- `copyOfRange`: Copy array
- `binarySearch`: Searching an array for a specific value and return the index
- `equals`: Comparing two arrays to determine if they are equal or not
- `fill`: Filling an array to place a specific value at each index
- `parallelSort`: Sorting an array into ascending order.

```java
char[] copyFrom = {'d', 'e', 'c', 'a' };
char[] copyTo = java.util.Arrays.copyOfRange(copyFrom, 1, 3);
```