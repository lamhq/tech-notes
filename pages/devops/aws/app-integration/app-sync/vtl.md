# VTL

## Most Valuable Template Statements

```vtl
# Set a new variable with contents "HELLO!"
set($newVar = "HELLO!")

# Get the current date and time, format like 2018-02-06T19:01:35.749Z
$util.time.nowIS08601()

# Make a new unique ID, great for creating objects
$util.autoId()

# Encode context.result as JSON
$util.toJson($context.result)

# Error out of template execution
$util.error("Error Description Goes Here")
```


## References

- [Resolver mapping template utility reference](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-util-reference.html).
