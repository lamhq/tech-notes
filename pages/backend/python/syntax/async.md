# Asynchronous Programming

Require Python 3.5+


## Simple example

```py
import asyncio

async def main():
    result = await fetch_url("http://example.com")
    print(result)

asyncio.run(main())
```


## Running tasks concurrently

Await multiple asynchronous tasks:

```py
import asyncio

async def fetch_url_1():
    # Do some IO-bound or high-level CPU-bound work
    await asyncio.sleep(1)
    return "Done 1"

async def fetch_url_2():
    # Do some IO-bound or high-level CPU-bound work
    await asyncio.sleep(1)
    return "Done 2"

async def main():
    # Run two tasks concurrently
    task1 = asyncio.create_task(fetch_url_1())
    task2 = asyncio.create_task(fetch_url_2())

    # Wait for both tasks to complete
    result1, result2 = await asyncio.gather(task1, task2)
    print(result1)  # This will print "Done 1"
    print(result2)  # This will print "Done 2"

asyncio.run(main())
```