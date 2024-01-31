# Dependency Injection

Dependency object needs to be of the type `Callable`, includes functions and classes.

## Defining dependency function

```py
# the dependency function:
def user_dep(name: str = Params, password: str = Params):
    return {"name": name, "valid": True}
```
 
## Define the dependency

The path function `get_user()` expects an argument variable called `user`, and that variable will get its value from the dependency function `user_dep()`.

```py
from fastapi import FastAPI, Depends, Params

app = FastAPI()

# the path function / web endpoint:
@app.get("/user")
def get_user(user: dict = Depends(user_dep)) -> dict:
    return user
```

You can also define the dependency in your path decorator:

```py
from fastapi import FastAPI, Depends, Params

app = FastAPI()

# the dependency function:
def check_dep(name: str = Params, password: str = Params):
    if not name:
        raise

# the path function / web endpoint:
@app.get("/check_user", dependencies=[Depends(check_dep)])
def check_user() -> bool:
    return True
```

## Router scoped dependency

You can define dependency based on a router instead of the top-level application:

```py
from fastapi import FastAPI, Depends, APIRouter

router = APIRouter(..., dependencies=[Depends(depfunc)])
```

## Global scoped dependency

```py
from fastapi import FastAPI, Depends

def depfunc1():
    pass

def depfunc2():
    pass

app = FastAPI(dependencies=[Depends(depfunc1), Depends(depfunc2)])

@app.get("/main")
def get_main():
    pass
```
