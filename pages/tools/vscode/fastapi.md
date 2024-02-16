# FastAPI

## Type hinting Setup

Pylance (a language server for Python in VS Code) supports type hinting features that can be helpful for working with Pydantic models and FastAPI.

Open the Settings editor. Search for "python type checking mode" and set it to `basic` for basic type checking. You can set it to `strict` to enforce more advanced type checking rules.

![](https://code.visualstudio.com/assets/docs/python/fastapi-tutorial/type_checking_mode_setting.png)

Next, search for "Python inlay type hints", and enable inlay hints for **Variable Types** and **Function Return Types**.

![](https://code.visualstudio.com/assets/docs/python/fastapi-tutorial/function_and_variable_return_type_hint_settings.png)


## Debugging

Run the code by starting up the debugger (F5).

From the dropdown menu, select the FastAPI configuration option from the list:

![](https://code.visualstudio.com/assets/docs/python/fastapi-tutorial/fastapi_debug_config_option.png)


### Evaluating expressions

While debugging, to run an expression in Debug console, right-click on it and select **Evaluate in Debug Console**:

![](https://code.visualstudio.com/assets/docs/python/fastapi-tutorial/fastapi_evaluate_debug_console.png)
