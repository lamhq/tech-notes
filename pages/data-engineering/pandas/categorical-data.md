# Categorical Data

## Creating

Create a categorical from a list:
```py
lmh_values = ["low", "high", "medium", "medium", "high"]
lmh_cat = pd.Categorical(lmh_values)
"""
['low', 'high', 'medium', 'medium', 'high']
Categories (3, object): ['high', 'low', 'medium']
"""
```

Create from list but explicitly state the categories:
```py
lmh_cat = pd.Categorical(lmh_values, categories=["low", "medium", "high"])
```

Create a categorical using a Series and `dtype`:
```py
cat_series = pd.Series(lmh_values, dtype="category")
```

Create a categorical by converting an existing Series:
```py
s = pd.Series(lmh_values)
as_cat = s.astype("category")
as_cat
```


## Get category list

```py
lmh_cat.categories
```


## Get values

```py
lmh_cat.astype(str)
# array(['low', 'high', 'medium', 'medium', 'high'], dtype='<U6')
```


## Get mapping codes

```py
lmh_cat.codes
# array([1, 0, 2, 2, 0], dtype=int8)
```


## Sorting

Sort categorical values by code:
```py
# sorting is done using the codes underlying each value
lmh_cat.sort_values()
```


## Renaming

Renaming categories by setting `.categories` property (in place):

```py
cat = pd.Categorical(["a","b","c","a"], categories=["a", "b", "c"])
cat.categories = ["bronze", "silver", "gold"]
```

Out of place:
```py
# renames the categories by `.rename_categories` method
cat = cat.rename_categories(["x", "y", "z"])
```


## Appending

```py
new_cat = cat.add_categories(["platinum"])
```


## Removing

```py
no_bronze = metals.remove_categories(["bronze"])
```

Removing unused categories:
```py
with_platinum.remove_unused_categories()
```


## Setting

Remove categories by setting new categories, uncategorized items are replaced with `NaN`:
```py
s = pd.Series(["one","two","four", "five"], dtype="category")

# remove the "two", "three" and "five" categories (replaced with NaN)
s = s.cat.set_categories(["one","four"])
```


## Get information

```py
lmh_cat.describe()

# Get value counts
lmh_cat.value_counts()

# Get Minimum, maximum and mode
(lmh_cat.min(), lmh_cat.max(), lmh_cat.mode())
```


## Quantiling & labeling

Assign categorial value base on numeric field.

The below example devide student's scores in to quantiles and assign grade to each student base on quantiles:

Create 10 student with random grades:
```py
np.random.seed(123456)
names = ['Ivana', 'Norris', 'Ruth', 'Lane', 'Skye', 'Sol', 
         'Dylan', 'Katina', 'Alissa', "Marc"]
grades = np.random.randint(50, 101, len(names))
scores = pd.DataFrame({'Name': names, 'Grade': grades})
```

Define the grades in letters and their bins:
```py
score_bins    = [ 0,  59,   62,  66,   69,   72,  76,   79,   82,  
                 86,   89,   92,  99, 100]
letter_grades = ['F', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 
                 'B+', 'A-', 'A', 'A+']
```

Assign the grade to each student:
```py
# cut the scores based on bins and assign the letter grade
letter_cats = pd.cut(scores.Grade, score_bins, labels=letter_grades)
scores['Letter'] = letter_cats
```