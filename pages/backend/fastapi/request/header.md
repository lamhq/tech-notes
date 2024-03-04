# Header Parameters

HTTP headers are case-insensitive.

FastAPI converts the parameter names characters from underscore (`_`) to hyphen (`-`). (`user_agent` will be converted to `user-agent`).

```py
from typing import Annotated

from fastapi import FastAPI, Header

app = FastAPI()


@app.get("/items/")
async def read_items(user_agent: Annotated[str | None, Header()] = None):
    return {"User-Agent": user_agent}
```

If you need to disable automatic conversion of underscores to hyphens, set the parameter `convert_underscores` of `Header` to `False`:

```py
@app.get("/items/")
async def read_items(
    strange_header: Annotated[str | None, Header(convert_underscores=False)] = None
):
    return {"strange_header": strange_header}
```


## Multi-values header

https://fastapi.tiangolo.com/tutorial/header-params/#duplicate-headers