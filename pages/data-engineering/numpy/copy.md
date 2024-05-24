# Copying Array

## Copy

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
x = arr.copy()
arr[0] = 42

print(arr)
# [42  2  3  4  5]
print(x)
# [1 2 3 4 5]
```


## View

The main difference between a copy and a view of an array is that the **copy is a new array**, and the view is just a **view of the original array**.

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
x = arr.view()
arr[0] = 42

print(arr)
# [42  2  3  4  5]
print(x)
# [42  2  3  4  5]
```

To check if an array owns it's data, use the attribute `base` that returns `None` if the array owns the data.

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5])

x = arr.copy()
y = arr.view()

print(x.base)
# None
print(y.base)
# [1 2 3 4 5]
```
