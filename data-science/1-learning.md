# Doing Data Science with Python (course)

## Setting up working environment

### Jupyter Notebook - Magic functions

```sh
%matplotlib inline
```

```sh
%time x = range(10000)
```

```sh
%%timeit x = range(10000)
max(x)
```

```sh
%%writefile test.txt
this is written from a jupyter
notebook
```

```sh
%ls
```

```sh
%%!
pip install ipython-sql
```

```sh
%load_ext sql
```

```sh
%lsmagic
```


## Extracting Data

- Extracting Data from database
- Extracting Data through API
- Extracting Data using Web Scraping (request, BeautifulSoup)
- Download titanic dataset from kaggle


## Exploring and processing data

- Exploratory data analysis (EDA)
- EDA techinques:
  - Summary statistics
    - Numerical:
      - Centrality Measure: Mean, Median
      - Spread/Dispersion measure: range, percentiles, box-whisker plot, variance, standard deviation 
    - Categorical:
      - Total count
      - Unique count
      - Category counts & proportions
      - Percategory statistics
  - Distribution
    - Univariate: histogram, KDE, Normal Distribution, Skewness
    - Bivariate: scatter plot
  - Grouping
  - Crosstab
  - Pivot
- Data Munging
  - Data issues
    - Missing values
      - Deletion
      - Imputation 
        - Mean imputation
        - Median imputation
        - Mode imputation (categorical)
        - Forward/backward Fill (time series)
        - Predictive model
    - Extreme values (outliers)
      - Outlier Detection: Histogram, Boxplot, Scatterplot
      - Outlier Treatment: Removal, Transformation, Binning (discretization), Imputation