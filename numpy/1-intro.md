# NumPy Introduction

## What is NumPy?

NumPy is a Python library used for working with arrays.

It also has functions for working in domain of linear algebra, fourier transform, and matrices.

NumPy stands for Numerical Python.


## Why Use NumPy?

In Python we have lists that serve the purpose of arrays, but they are slow to process.

NumPy aims to provide an array object that is up to 50x faster than traditional Python lists.

Arrays are very frequently used in data science, where speed and resources are very important.

Data Science is a branch of computer science where we study how to store, use and analyze data for deriving information from it.


## Why is NumPy Faster Than Lists?

NumPy arrays are stored at one continuous place in memory unlike lists, so processes can access and manipulate them very efficiently.

This is the main reason why NumPy is faster than lists. Also it is optimized to work with latest CPU architectures.


## Installation of NumPy

```shell
pip install numpy
```


## Import NumPy

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