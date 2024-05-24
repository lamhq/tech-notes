# NumPy Data Types

## Available NumPy types

Below is a list of all data types in NumPy and the characters used to represent them:
- `i` - integer
- `b` - boolean
- `u` - unsigned integer
- `f` - float
- `c` - complex float
- `m` - timedelta
- `M` - datetime
- `O` - object
- `S` - string
- `U` - unicode string
- `V` - fixed chunk of memory for other type ( void )


## Checking the Data Type of an Array

```py
import numpy as np

arr = np.array([1, 2, 3, 4])
print(arr.dtype)
# int64

arr2 = np.array(['apple', 'banana', 'cherry'])
print(arr2.dtype)
# <U6
```

## Creating Arrays With a Defined Data Type

```py
import numpy as np

arr = np.array([1, 2, 3, 4], dtype='S')

print(arr)
# [b'1' b'2' b'3' b'4']

print(arr.dtype)
# |S1
```

If a type is given in which elements can't be casted then NumPy will raise a `ValueError`.


## Converting Data Type on Existing Arrays

The `astype()` function creates a copy of the array, and allows you to specify the data type as a parameter.

```py
import numpy as np

arr = np.array([1.1, 2.1, 3.1])

newarr = arr.astype('i')

print(newarr)
# [1, 2, 3]
print(newarr.dtype)
# int32
```
