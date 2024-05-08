# Array & Matrices

## Array

### Creating Arrays

To create an array with four elements in a single row, separate the elements with either a comma (`,`) or a space:
```matlab
a = [1 2 3 4]
```
This type of array is called a **row vector**.

### Array Operations
MATLAB allows you to process all values in a matrix using a single arithmetic operator or function.

Examples:
- `a + 10` adds 10 to each element of `a`.
- `sin(a)` computes the sine of each element in `a`.
- Element-wise multiplication: `a .* a`.
- Element-wise exponentiation: `a.^3`.
- Concatenation: `N = [a, a]`. This creates a 1x8 vector by concatenating `a` horizontally


## Matrices

### Creating Matrices

To create a matrix, use semicolons (`;`) to separate the rows.
```matlab
A = [1 2 0; 2 5 -1; 4 10 -1]
```
This creates a 3x3 matrix `A`.


### Matrix Operations
   
- Addition: `B = A + 2` adds 2 to each element of matrix `A`.
- Transposition: `B = A'` gives the transpose of matrix `A`.
- Matrix multiplication: `C = A * B` computes the product of matrices `A` and `B`.
- Element-wise multiplication: `C = A .* B` multiplies corresponding elements.
- Solving linear equations: `x = A \ b` solves `A*x = b`.
- Concatenation: `N = [A, A]`. This creates a 3x6 matrix by concatenating `A` horizontally
