# Row Operations

## Filter

Using equal condition:
```py
df.filter(df.state == "OH")
```

Using not equal filter condition:
```py
df.filter(df.state != "OH") \
    .show(truncate=False) 

# Another expression
df.filter(~(df.state == "OH")) \
    .show(truncate=False)
```

Use the `col()` function to refer to the column name:
```py
from pyspark.sql.functions import col

df.filter(col("state") == "OH") \
    .show(truncate=False) 
```

Use SQL Expression:

```py
# Using SQL Expression
df.filter("gender == 'M'").show()

# For not equal
df.filter("gender != 'M'").show()
df.filter("gender <> 'M'").show()
```

Use multiple conditions:
```py
# AND
df.filter( (df.state  == "OH") & (df.gender  == "M") )

# OR
df.filter( (df.state  == "OH") | (df.gender  == "M") )
```

Filter by a list of values:
```py
li=["OH","CA","DE"]
df.filter(df.state.isin(li))

# not
df.filter(~df.state.isin(li))
```

Start with/end with/contains:
```py
df.filter(df.state.startswith("N"))

df.filter(df.state.endswith("H"))

df.filter(df.state.contains("H"))
```

Regular Expression:
```py
# like - SQL LIKE pattern
df.filter(df2.name.like("%rose%"))

# rlike - SQL RLIKE pattern (LIKE with Regex), case insensitive
df.filter(df.name.rlike("(?i)^*rose$"))
```

For columns that have type array:
```py
from pyspark.sql.functions import array_contains

df.filter(array_contains(df.languages,"Java")) \
    .show(truncate=False)

# Output
#+----------------+------------------+-----+------+
#|name            |languages         |state|gender|
#+----------------+------------------+-----+------+
#|[James, , Smith]|[Java, Scala, C++]|OH   |M     |
#|[Anna, Rose, ]  |[Spark, Java, C++]|NY   |F     |
#+----------------+------------------+-----+------+
```


## Sort

```py
df.sort("department", "state", ascending=[True, False]) 
df.sort(df.department.asc(), df.state.desc())
```

```py
df.orderBy("department","state")
df.orderBy(col("department").asc(), col("state").desc())
```
