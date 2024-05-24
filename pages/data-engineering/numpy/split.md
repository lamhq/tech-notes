# Splitting Array

# Split 1-D array into `n` arrays
```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6])

# number of array to split: 3
newarr = np.array_split(arr, 3)

print(newarr)
```

## Splitting 2-D Arrays

```py
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15], [16, 17, 18]])

newarr = np.array_split(arr, 3, axis=1)

newarr
'''
[array([[ 1],
        [ 4],
        [ 7],
        [10],
        [13],
        [16]]),
 array([[ 2],
        [ 5],
        [ 8],
        [11],
        [14],
        [17]]),
 array([[ 3],
        [ 6],
        [ 9],
        [12],
        [15],
        [18]])]
'''
```
