# Debug

## Debug code in libraries/packages

Allow you to set breakpoint and debug external libraries in VS Code.

Great when you want to understand how the library/framework run.

To do that, open `launch.json` file, add `"justMyCode": false` to your config:

```json
{
    "configurations": [
        {
            // ...
            "justMyCode": false
        }
    ]
}
```