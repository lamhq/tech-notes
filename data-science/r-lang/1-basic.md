# R Basic

## Assignment Operators

Assign a value to a name.

```
x <- value
```

- The operator `<-` can be used anywhere
- the operator `=` is only allowed at the top level
- The operators `<<-` and `->>` are normally only used in functions

Shortcut key for Mac: `Option` + `-`


## Remove objects from environment

```{r}
x <- 10
rm(x)
```

## Vector operations

Create vectors:

```
x <- c(1, 3, 6)
y <- c(2, 4, 5)
```

Calculations:

```
x + 2
x * 2
x ^ 2
x + y
```