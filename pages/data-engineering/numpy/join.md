# Joining Arrays

## Join two 1-D arrays

```py
import numpy as np

arr1 = np.array([1, 2, 3])

arr2 = np.array([4, 5, 6])

# array([1, 2, 3, 4, 5, 6])
arr = np.concatenate((arr1, arr2))
```

## Join two 2-D arrays

```py
import numpy as np

arr1 = np.array([[1, 2], [3, 4]])

arr2 = np.array([[5, 6], [7, 8]])

arr = np.concatenate((arr1, arr2), axis=1)

'''
[ [1 2 5 6]
 [3 4 7 8] ]
'''
```

```py
import numpy as np

arr1 = np.array([1, 2, 3])

arr2 = np.array([4, 5, 6])

arr = np.stack((arr1, arr2), axis=1)

'''
[[1 4]
 [2 5]
 [3 6]]
'''
```