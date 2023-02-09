# Basic syntax

## Operators

`+`, `-`, `*`, `/`, `%` (modulus)


## Comment

```go
// My weight loss program.
package main

import "fmt"

// main is the function where it all begins.
func main() {
  fmt.Print("My weight on the surface of Mars is ")
  fmt.Print(149.0 * 0.3783)
  fmt.Print(" lbs, and I would be ")
  fmt.Print(41 * 365 / 687)
  fmt.Print(" years old.")
}
```


## Printing

Passing arguments:

```go
fmt.Println("My weight on the surface of Mars is", 149.0*0.3783, "lbs, and I would be", 41*365.2425/687, "years old.")
// My weight on the surface of Mars is 56.3667 lbs, and I would be 21.79758733624454 years old.
```

Insert values anywhere in the text:

```go
// My weight on the surface of Mars is 56.3667 lbs,
fmt.Printf("My weight on the surface of Mars is %v lbs,", 149.0*0.3783)

// and I would be 21 years old.
fmt.Printf(" and I would be %v years old.\n", 41*365/687)
```

Align text, a positive number pads with spaces to the left, and a negative number pads with spaces to the right:

```go
// %4v to pad a value to a width of 4 characters. 
fmt.Printf("%-15v $%4v\n", "SpaceX", 94)
```


## COnstant