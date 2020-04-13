# Operators

## Assignment, Arithmetic, and Unary Operators

- `+`, `-`, `*`, `/`, `%`
- `++`, `--`, `!`


## Equality, Relational, and Conditional Operators

- `==`, `!=`, `>`, `>=`, `<`, `<=`
- `&&`, `||`, `?:` (ternary operator)
- `instanceof`

```java
Parent obj1 = new Parent();
Parent obj2 = new Child();
System.out.println("obj1 instanceof Parent: " + (obj1 instanceof Parent));
```


## Bitwise and Bit Shift Operators

- `~` (inverse), `<<`, `>>`, `>>>`
- `&` (and), `^` (or), `|` (xor)

```java
int bitmask = 0x000F;
int val = 0x2222;
// prints "2"
System.out.println(val & bitmask);
```