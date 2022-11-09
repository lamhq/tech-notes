# Categorial Data

## Creating Categoricals

```py
# create a categorical from a list.  
lmh_values = ["low", "high", "medium", "medium", "high"]
lmh_cat = pd.Categorical(lmh_values)

# create from list but explicitly state the categories
lmh_cat = pd.Categorical(lmh_values, categories=["low", "medium", "high"])

# create a categorical using a Series and dtype
cat_series = pd.Series(lmh_values, dtype="category")

# create a categorical using a Series and dtype
s = pd.Series(lmh_values)
as_cat = s.astype("category")
cat_series
```

## Get info

```py
lmh_cat.categories
```

## Get values

```py
lmh_cat.astype(str)
```

## Get mapping codes

```py
lmh_cat.codes
```

## Sort values

```py
# sorting is done using the codes underlying each value
lmh_cat.sort_values()
```


## Renaming Categories

In place:

```py
cat = pd.Categorical(["a","b","c","a"], categories=["a", "b", "c"])

# renames the categories by assigning new values to `.categories` property
cat.categories = ["bronze", "silver", "gold"]
```

Out of place:

```py
# renames the categories by `.rename_categories` method
cat = cat.rename_categories(["x", "y", "z"])
```

## Appending new categories

```py
new_cat = cat.add_categories(["platinum"])
```

## Removing Categories

```py
no_bronze = metals.remove_categories(["bronze"])
```

## Removing unused categories

```py
with_platinum.remove_unused_categories()
```

## Setting categories (add & remove)

```py
s = pd.Series(["one","two","four", "five"], dtype="category")

# remove the "two", "three" and "five" categories (replaced with NaN)
s = s.cat.set_categories(["one","four"])
```

## Get descriptive information

```py
metals.describe()

# Get value counts
metals.value_counts()

# Get Minimum, maximum and mode
(metals.min(), metals.max(), metals.mode())
```

## Assign categorial value base on numeric field

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

Assign the letter grade to each student:

```py
# cut based upon the bins and assign the letter grade
letter_cats = pd.cut(scores.Grade, score_bins, labels=letter_grades)
scores['Letter'] = letter_cats
```