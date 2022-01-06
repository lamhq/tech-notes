# NumPy Array Iterating

## Iterating with `for` loop

```py
import numpy as np

arr = np.array([1, 2, 3])

for x in arr:
  print(x)
# 1
# 2
# 3
```


```py
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

for x in arr:
  for y in x:
    print(y)
```


## Iterating Arrays Using `nditer()`

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

arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])

for x in np.nditer(arr[:, ::2]):
  print(x)

"""
1
3
5
7  
"""
```

## Enumerated Iteration Using ndenumerate()

```py
import numpy as np

arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])

for idx, x in np.ndenumerate(arr):
  print(idx, x)

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
