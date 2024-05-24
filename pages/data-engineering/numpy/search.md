# Searching Arrays

## Search by value

Find the indexes where the value is 4:

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 4, 4])

# [3, 5, 6]
indexes = np.where(arr == 4)
```


Find the indexes where the values are even:

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6, 7, 8])

# [1, 3, 5, 7]
x = np.where(arr%2 == 0)
```
