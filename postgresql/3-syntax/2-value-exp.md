# Value Expressions

## Column References

A column can be referenced in the form:

```
correlation.columnname
```

**correlation** is the name of a table (possibly qualified with a schema name), or an alias for a table defined by means of a `FROM` clause. 

The correlation name and separating dot can be omitted if the column name is unique across all the tables being used in the current query.


## Positional Parameters

A positional parameter reference is used to indicate a value that is supplied externally to an SQL statement. 

```
$number
```


## Subscripts

If an expression yields a value of an array type, then a specific element of the array value can be extracted by writing:

```
expression[subscript]
```

or multiple adjacent elements (an "array slice") can be extracted by writing:

```
expression[lower_subscript:upper_subscript]
```

multiple subscripts can be concatenated when the original array is multidimensional:

```
mytable.two_d_column[17][34]
```


## Field Selection

If an expression yields a value of a composite type (row type), then a specific field of the row can be extracted by writing:

```
expression.fieldname
```

In general the row expression must be parenthesized:

```sql
-- compositecol is a column name not a table name
(compositecol).somefield

-- mytable is a table name not a schema name
(mytable.compositecol).somefield
```

Parentheses can be omitted when the expression to be selected from is just a table reference or positional parameter:

```sql
mytable.mycolumn
$1.somecolumn
```

You can ask for all fields of a composite value by writing `.*`:

```sql
(compositecol).*
```

## Function Calls

```
sqrt(2)
```


## Type Casts

```
CAST ( expression AS type )
expression::type
typename ( expression )
```


## Scalar Subqueries

```sql
SELECT name, (SELECT max(pop) FROM cities WHERE cities.state = states.name)
FROM states;
```


## Array Constructors

```sql
SELECT ARRAY[1,2,3+4];

SELECT ARRAY[[1,2],[3,4]];

SELECT ARRAY[]::integer[];

SELECT ARRAY(SELECT oid FROM pg_proc WHERE proname LIKE 'bytea%');
```


## Row Constructors

```sql
SELECT ROW(1,2.5,'this is a test');
SELECT ROW(t.*, 42) FROM t;
SELECT ROW(t.f1, t.f2, 42) FROM t;
```
