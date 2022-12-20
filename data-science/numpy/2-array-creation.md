# NumPy Creating Arrays


```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(type(arr))
# <class 'numpy.ndarray'>

arr2 = np.array((1, 2, 3, 4, 5))
print(arr2)
# [1 2 3 4 5]
```


## 1-D Arrays

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5])

print(arr)
# [1 2 3 4 5]
```

## 2-D Arrays

```py
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

print(arr)
# [[1 2 3]
#  [4 5 6]]
```


## Inspecting array

- `ndarray.ndim`: the number of axes (dimensions) of the array.
- `ndarray.shape`: the dimensions of the array.
- `ndarray.size`: the total number of elements of the array.
- `ndarray.dtype`: an object describing the type of the elements in the array.
- `ndarray.itemsize`: the size in bytes of each element of the array.


```py
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

# 2
arr.ndim

# (2, 3)
arr.shape

# 6
arr.size

# dtype('int64')
arr.dtype

# 8
arr.itemsize
```