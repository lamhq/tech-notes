# Basic

## Operators

- Arithmetic Operators: `+`, `-`, `*`, `/`, `\`, `^`, `'`, `.*`, `./`, `.^`, `.'` 
- Relational Operators: `==`, `~=`, `>`, `>=`, `<`, `<=`
- Logical Operators: `&`, `|`, `&&`, `||`, `~`

See [MATLAB Operators and Special Characters](https://www.mathworks.com/help/matlab/matlab_prog/matlab-operators-and-special-characters.html).


## Variables

A valid variable name starts with a letter, followed by letters, digits, or underscores.

MATLAB is case sensitive, so `A` and `a` are not the same variable.

To define a variable:
```matlab
m = 3*5
```

To check if a name is a MATLAB keyword, use `iskeyword` command.

To check whether a proposed name is already in use with the `exist` or `which` function.
Unless you specify an output variable, MATLAB stores results in a variable named `ans`.


## Statements

Continue Long Statements on Multiple Lines using ellipsis (`...`):
```matlab
s = 1 - 1/2 + 1/3 - 1/4 + 1/5 ...
    - 1/6 + 1/7 - 1/8 + 1/9;
```

```matlab
mytext = ['Accelerating the pace of ' ...
    'engineering and science'];
```

## Constants

### Built-in constants

- `pi`
```matlab
a = pi
```
