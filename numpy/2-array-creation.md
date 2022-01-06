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


## Check Number of Dimensions

- `ndarray.ndim`: the number of axes (dimensions) of the array.
- `ndarray.shape`: the dimensions of the array.
- `ndarray.size`: the total number of elements of the array.
- `ndarray.dtype`: an object describing the type of the elements in the array.
- `ndarray.itemsize`: the size in bytes of each element of the array.
- `ndarray.data`: the buffer containing the actual elements of the array. Normally, we won’t need to use this attribute because we will access the elements in an array using indexing facilities.