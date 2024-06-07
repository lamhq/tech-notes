# Pandas

## Version

This document is for version `1.5.3`.


## What is Pandas?

Pandas is a Python library used for working with data sets.

It has functions for analyzing, cleaning, exploring, and manipulating data.

It makes data cleaning and analysis fast and convenient.


## Use case

### Data Cleaning and Transformation
 
Clean and prepare data before analysis:
- handling missing data, removing duplicates
- transforming data into a consistent format
- combine multiple datasets: `.merge()`, `.concat()`, SQL-like joins

### Data Exploration and Analysis

- Explore data using descriptive statistics, grouping, and aggregation.
- Calculate summary statistics, such as mean, median, and standard deviation.
- Time Series Analysis: resampling, rolling averages, and date-based calculations.
- Visualize data using Pandas' built-in plotting capabilities.
- Use Pandas in conjunction with other libraries (e.g., Scikit-Learn) for machine learning tasks.

### Reading and Writing Data
- Read data from various formats (CSV, Excel, SQL databases, etc.) into Pandas DataFrames.
- Save DataFrames to different file formats.


## Installation
```sh
pip install pandas
```

```python
import pandas as pd

print(pd.__version__)
```


## Reference

The code for this document is from the book **Learning pandas, 2nd edition**.

The example code and data is located at [Github](https://github.com/PacktPublishing/Learning-Pandas-Second-Edition).