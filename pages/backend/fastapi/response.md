# Returning Response

By default, FastAPI converts whatever you return from your endpoint function to JSON.

Response headers will have `Content-type: application/json`.


## Status Code

By default, FastAPI returns a 200 status code; exceptions raise 4xx codes.

In the path decorator, you specify the HTTP status code that should be returned if all goes well. Exceptions will generate their own codes and override it.

```py
@app.get("/happy")
def happy(status_code=200):
    return ":)"
```


## Headers

```py
@app.get("/header/{name}/{value}")
def header(name: str, value: str, response:Response):
    response.headers[name] = value
    return "normal body"
```


## Response Types

Response types include the following:

- JSONResponse (the default)
- HTMLResponse
- PlainTextResponse
- RedirectResponse
- FileResponse
- StreamingResponse

Those can be imported from `fastapi.responses`

## Custom response type

For other output formats (also known as MIME types), you can use a generic `Response` class, which needs the following:

- `content`: String or bytes
- `media_type`: The string MIME type
- `status_code`: HTTP integer status code
- `headers`: A dict of strings


## Type Conversion

FastAPI uses an internal function called `jsonable_encoder()` to convert any data structure to a "JSONable" Python data structure.

Then calls the usual `json.dumps()` to turn that into a JSON string.
