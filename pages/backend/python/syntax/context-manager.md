# Context Managers and Python's `with` Statement

## The `with` Statement

The Python `with` statement simplifies resource management. 

It wraps the execution of a block of code within methods defined by a context manager.

It ensures that cleanup operations are always performed, even if the block of code is exited due to an exception.

Pros:
- The `with` statement can make your code clearer, safer, and reusable (compared to `try … finally`).

Cons:
- You can only use the with statement with objects that support the context management protocol. While `try … finally` allows you to perform cleanup actions for arbitrary objects


## Syntax

```py
with expression as target_var:
    do_something(target_var)
```

- `expression` must return an object that implements the context management protocol.

Here's how the `with` statement proceeds when Python runs into it:

1. Call `expression` to obtain a context manager.
2. Call `.__enter__()` on the context manager and bind its return value to `target_var` if provided.
3. Execute the `with` code block.
4. Call `.__exit__()` on the context manager when the with code block finishes.


## Context Managers

A context manager is an object that defines the methods:

1. `.__enter__()`: called by the with statement to enter the runtime context.
2. `.__exit__()`: called when the execution leaves the with code block.

If you provide a `target_var` with `as`, then the return value of calling `.__enter__()` on the context manager object is bound to that variable.

`.__enter__()` typically provides the setup code.

Once the with code block finishes, `.__exit__()` gets called. This method typically provides the teardown logic or cleanup code.


## Example

```py
with open("hello.txt", mode="w") as file:
    file.write("Hello, World!")
```

- `open()` returns a context manager
- the `with` statement calls `.__enter__()` and assigns its return value to file
- you can manipulate the file inside the `with` code block
- When the block ends, `.__exit__()` automatically gets called and closes the file for you


## Multiple context managers

```py
with A() as a, B() as b:
    pass
```
