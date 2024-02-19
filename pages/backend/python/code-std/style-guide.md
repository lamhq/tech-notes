# Style guide

[PEP 8](https://pep8.org/) is the official style guide for writing Python code.

It provides conventions and best practices to improve code readability and consistency.

Some key aspects of PEP 8:

1. **Indentation and Line Length**:
    - Use **4 spaces** per indentation level. Consistent indentation enhances code readability.
    - For continuation lines, align wrapped elements vertically or use a hanging indent.
    - Example with hanging indent:
      ```python
      some_method(
        argument_one,
        argument_two,
        argument_three=[
          'parameter_one',
          'parameter_two',
          'parameter_three',
        ]
      )
      ```

2. **Naming Conventions**:
    - Follow consistent naming patterns:
      - **Variables and functions**: Use lowercase with underscores (snake_case).
      - **Classes**: Use CamelCase (initial capital letter for each word).
      - **Constants**: Use uppercase with underscores.
    - Be descriptive in your names to convey intent.

3. **Whitespace and Blank Lines**:
    - Use blank lines to separate logical blocks of code.
    - Avoid trailing whitespace at the end of lines.
    - Use a single space after commas in function arguments.

4. **Imports**:
    - Organize imports alphabetically.
    - Group imports into three sections: standard library, third-party packages, and local modules.
    - Avoid wildcard imports (`from module import *`).

5. **Comments and Docstrings**:
    - Write clear comments to explain complex logic or non-obvious code.
    - Use docstrings to document functions, classes, and modules.
    - Follow the conventions outlined in **PEP 257** for docstrings.

For more details, you can explore the [official PEP 8 documentation](https://pep8.org/).
