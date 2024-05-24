# Accessing Array Elements

## 1-D Array

The indexes in NumPy arrays start with 0

Use negative indexing to access an array from the end.

```py
import numpy as np

arr = np.array([1, 2, 3, 4])

print(arr[0])
# 1

print(arr[-1])
# 4
```


## 2-D Arrays

```py
import numpy as np

arr = np.array([[1,2,3,4,5], [6,7,8,9,10]])

print('2nd element on 1st row: ', arr[0, 1])
# 2nd element on 1st dim:  2
```


## 3-D Arrays

```py
import numpy as np

arr = np.array([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]])

print(arr[0, 1, 2])
# 6
```
