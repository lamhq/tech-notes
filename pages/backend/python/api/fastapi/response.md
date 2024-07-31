# Returning Response

## Status Code

By default, FastAPI returns a 200 status code; exceptions raise 4xx codes.

In the path decorator, you specify the HTTP status code that should be returned if all goes well. Exceptions will generate their own codes and override it.

```py
@app.get("/happy")
def happy(status_code=200):
    return ":)"
```


## Returning Error

To return an error response, raise a `HTTPException`:
```py
from fastapi import HTTPException

@app.get("/{id}")
def find_one(id):
    raise HTTPException(status_code=404, detail='Item not found')
```


## Headers

```py
@app.get("/header/{name}/{value}")
def header(name: str, value: str, response:Response):
    response.headers[name] = value
    return "normal body"
```


## Response Types

By default, FastAPI converts whatever you return from your endpoint function to JSON.

Response headers will have `Content-type: application/json`.

Response types include the following:

- JSONResponse (the default)
- HTMLResponse
- PlainTextResponse
- RedirectResponse
- FileResponse
- StreamingResponse

Those can be imported from `fastapi.responses`

For other output formats (also known as MIME types), you can use a generic `Response` class, which needs the following:

- `content`: String or bytes
- `media_type`: The string MIME type
- `status_code`: HTTP integer status code
- `headers`: A dict of strings
