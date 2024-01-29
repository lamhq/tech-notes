# Getting started

## Installation

Install FastAPI framework:

```shell
pip install fastapi
```

Install Uvicorn web server:

```shell
pip install uvicorn
```


## Write code

```py filename="hello.py"
from fastapi import FastAPI

app = FastAPI()

@app.get("/hi")
def greet():
    return "Hello? World?"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("hello:app", reload=True)
```

`greet` is a path function that handle http request and return a response.

## Run the app

```shell
python hello.py
```
