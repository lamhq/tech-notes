# Array Iterating

## Using `for` loop

```py
import numpy as np

arr = np.array([1, 2, 3])

for x in arr:
  print(x)
# 1
# 2
# 3
```

2-D array:
```py
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

for x in arr:
  for y in x:
    print(y)
```


## Using `nditer()`

```py
import numpy as np

arr = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])

for x in np.nditer(arr):
  print(x)
"""
1
2
3
4
5
6
7
8
"""
```

### Iterating With Different Step Size

```py
import numpy as np

arr = np.array([[1, 2, 3, 4, 9], [5, 6, 7, 8, 0]])

# arr[:, ::2] -> slicing operation on the array which selects all rows (:) 
# and every other column starting from the first column (slicing with step 2)
for x in np.nditer(arr[:, ::2]):
  print(x)
"""
1
3
9
5
7
0
"""
```


## Using `ndenumerate()`

```py
import numpy as np

arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])

for idx, item in np.ndenumerate(arr):
  print(idx, item)

"""
(0, 0) 1
(0, 1) 2
(0, 2) 3
(0, 3) 4
(1, 0) 5
(1, 1) 6
(1, 2) 7
(1, 3) 8
"""
```
