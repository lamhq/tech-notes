# Context Managers

Context Managers and Python's `with` Statement

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


## Async `with`

The with statement also has an asynchronous version, `async with`.

This example checks if a given site is online:
```py
# site_checker_v0.py

import aiohttp
import asyncio

async def check(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            print(f"{url}: status -> {response.status}")
            html = await response.text()
            print(f"{url}: type -> {html[:17].strip()}")

async def main():
    await asyncio.gather(
        check("https://realpython.com"),
        check("https://pycoders.com"),
    )

asyncio.run(main())
```


## Handling exception in context manager

You can return a truthy value in `.__exit__()` to swallow the exception in the `with` code block.

```py
# exc_handling.py

class HelloContextManager:
    def __enter__(self):
        print("Entering the context")
        return "Hello, World!"

    def __exit__(self, exc_type, exc_value, exc_tb):
        print("Leaving the context")
        if isinstance(exc_value, IndexError):
            # Handle IndexError here
            print(f"An exception occurred in your with block: {exc_type}")
            print(f"Exception message: {exc_value}")
            return True

with HelloContextManager() as hello:
    print(hello)
    hello[100]

print("Continue normally from here")
```

If you return `False`, the exception propagates out.


## Creating Context Managers

### Class-based

```py
class HelloContextManager:
    def __enter__(self):
        print("Entering the context")
        return "Hello, World!"

    def __exit__(self, exc_type, exc_value, exc_tb):
        print("Leaving the context")
        print('Exception type:', exc_type, 'Exception Value:', exc_value, 'Trace back:', exc_tb, sep="\n")

with HelloContextManager() as hello:
    print(hello)
```

Output:
```
Entering the context
Hello, World!
Leaving the context
Exception type:
None
Exception Value:
None
Trace back:
None
```


### Function-Based

If you decorate a generator function with `@contextmanager`, then you get a function-based context manager:

```py
from contextlib import contextmanager

@contextmanager
def hello_context_manager():
    print("Entering the context")
    yield "Hello, World!"
    print("Leaving the context")


with hello_context_manager() as hello:
    print(hello)
```

Output:
```
Entering the context
Hello, World!
Leaving the context
```

- Before the `yield` statement, you have the setup section.
- The `yield` statement itself provides the object that will be assigned to the with `target` variable.
- After the `yield` statement, you have the teardown section


### Asynchronous Context Manager

To create an asynchronous context manager, you need to define the `.__aenter__()` and `.__aexit__()` methods.

```py
# site_checker_v1.py

import aiohttp
import asyncio

class AsyncSession:
    def __init__(self, url):
        self._url = url

    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        response = await self.session.get(self._url)
        return response

    async def __aexit__(self, exc_type, exc_value, exc_tb):
        await self.session.close()

async def check(url):
    async with AsyncSession(url) as response:
        print(f"{url}: status -> {response.status}")
        html = await response.text()
        print(f"{url}: type -> {html[:17].strip()}")

async def main():
    await asyncio.gather(
        check("https://realpython.com"),
        check("https://pycoders.com"),
    )

asyncio.run(main())
```
