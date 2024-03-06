# APIRouter

## Basic Usage

- the path of each path operation has to start with `/`
- the prefix must not include a final `/`

```py filename="app/routers/items.py"
from fastapi import APIRouter, Depends, HTTPException

from ..dependencies import get_token_header

router = APIRouter(
    prefix="/items",
    tags=["items"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_items():
    pass


@router.get("/{item_id}")
async def read_item(item_id: str):
    pass


@router.put(
    "/{item_id}",
    tags=["custom"],
    responses={403: {"description": "Operation forbidden"}},
)
async def update_item(item_id: str):
    pass
```

```py filename="app/main.py"
from fastapi import Depends, FastAPI
from .internal import admin
from .routers import items

app = FastAPI()

app.include_router(items.router)

@app.get("/")
async def root():
    pass
```


## Include router with custom options

Include router with custom prefix, tags, responses, and dependencies without modifying the original router.

```py
app.include_router(
    admin.router,
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(get_token_header)],
    responses={418: {"description": "I'm a teapot"}},
)
```


## Include an APIRouter in another

You can include an `APIRouter` in another `APIRouter`:
```py
router.include_router(other_router)
```


## Include the same router multiple times with different prefix

You can also use `.include_router()` multiple times with the same router using different prefixes.

Use cases:
- API versioning: `/api/v1`, `/api/latest`
