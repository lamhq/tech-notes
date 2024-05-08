# Functions

## Calling function

MATLAB has two ways of calling functions:
- Function syntax:
    ```matlab
    load('durer.mat') 
    ```
- Command syntax:
    ```matlab
    load durer.mat
    ```

Command syntax does not assign outputs to user defined variables. it is assigned to the `ans` variable.

Command syntax always passes inputs as character vectors and cannot pass variable values.
## Arguments

Passing keyword arguments when calling a function:
```matlab
plot(x, y, LineWidth=2)
```

## Function outputs

A function can return multiple results (outputs). To request more than one output, enclose the variable names in square brackets, `[]`:
```matlab
helpFile = which('help');
[helpPath,name,ext] = fileparts(helpFile);
```
- The `fileparts` function return three outputs `helpPath`, `name`, `ext`

To request only the first outputs of a function:
```matlab
helpPath = fileparts(helpFile);
```

To ignore function outputs, use a tilde `~`:
```matlab
[~,~,ext] = fileparts(helpFile);
```

## Built-in functions

- Math: `abs`, `eig`, `sin`, `sqrt`
- Matrix: `inv`
- `help`: display function's information

```matlab
y = sin(x)
```
