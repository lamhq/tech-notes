# Slicing Array

Slicing refers to extracting a portion of an array by specifying a range of indices.

## 1-D Array

```py
arr[start:end]
arr[start:end:step]
```

- If we don't pass start its considered `0`
- If we don't pass end its considered length of array in that dimension
- If we don't pass step its considered `1`
- The result includes the start index, but excludes the end index.
- Use the minus operator to refer to an index from the end

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6, 7])

print(arr[1:5])
# [2 3 4 5]

# Slice elements from index 4 to the end of the array
print(arr[4:])
# [5 6 7]

# Slice elements from the beginning to index 4 (not included)
print(arr[:4])
# [1 2 3 4]

# Slice from the index 3 from the end to index 1 from the end
print(arr[-3:-1])
# [5 6]
```


## 2-D Arrays

```py
import numpy as np

arr = np.array([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])

# At the second element, slice from index 1 to index 4 (not included)
print(arr[1, 1:4])
# [7 8 9]

# From both elements, return index 2
print(arr[0:2, 2])
# [3 8]
```