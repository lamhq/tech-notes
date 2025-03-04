# NumPy

## Version

This document is for NumPy version `1.26.4`.

## What is NumPy?

NumPy (Numerical Python) is a Python library used for working with arrays.

It also has functions for working in domain of linear algebra, fourier transform, and matrices.


## Use cases

Use NumPy arrays for scientific computing where speed and memory efficiency are critical.


## Why Use NumPy?

In Python we have lists that serve the purpose of arrays, but they are slow to process.

Arrays are very frequently used in data science, where speed and resources are very important.

NumPy aims to provide an array object that is up to 50x faster than traditional Python lists. NumPy arrays are stored at one continuous place in memory unlike lists, so processes can access and manipulate them very efficiently.


## Install NumPy

```sh
pip install numpy
```


## Quick start

Define a numpy array:
```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5])

print(arr)
# [1 2 3 4 5]
```


## Checking NumPy Version

```py
import numpy as np

print(np.__version__)
```