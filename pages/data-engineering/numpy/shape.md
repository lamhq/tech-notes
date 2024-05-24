# Array Shape

## Get the shape of an array

```py
import numpy as np

arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])

print(arr.shape)
# (2, 4)
```


## Reshape array

Reshape an array return a view

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

newarr = arr.reshape(4, 3)

print(newarr)
"""
[[ 1  2  3]
 [ 4  5  6]
 [ 7  8  9]
 [10 11 12]]
 """
```

You do not have to specify an exact number for one of the dimensions in the reshape method:

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6, 7, 8])

newarr = arr.reshape(2, 2, -1)

print(newarr)
"""
[[[1 2]
  [3 4]]

 [[5 6]
  [7 8]]]
"""
```


## Flattening the arrays

Flattening array means converting a multidimensional array into a 1D array.

```py
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

newarr = arr.reshape(-1)

print(newarr)
```
