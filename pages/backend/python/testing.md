# Testing

## Testing frameworks

- [pytest](https://docs.pytest.org/).


## Organize test files

Test files should be in a separate `tests` folder:

```
module/
    __init__.py
    module.py
    another_module.py
tests/
    test_module.py
    test_another_module.py
```

**Advantages**:
- This separation keeps your codebase cleaner and avoids cluttering the main code directory with test files.
- Clean codebase helps locate code file easier
- Isolated Work: allows individuals to concentrate on writing tests without interfering with others' code files.

**Disadvantages**:
- It’s not easy to find and import code files.
- You can not use relative imports in test files to import code files.