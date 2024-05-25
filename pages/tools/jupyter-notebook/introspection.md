# Introspection

Using a question mark (`?`) before or after a variable will display some general infor‐ mation about the object:
```py
In [2]: b?
Type: list
String form: [1, 2, 3] Length: 3
Docstring:
Built-in mutable sequence.
```

To show all names matching a wildcard expression:
```py
In [9]: import numpy as np

In [10]: np.*load*?
np.__loader__
np.load
np.loads
np.loadtxt
```
