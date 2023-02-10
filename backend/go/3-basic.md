# Basic syntax

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


## Constants and Variable

Constants:

```go
const lightSpeed = 299792
```

Variables:

```go
var distance = 56000000

var (
  distance = 56000000
  speed = 100800
)

var distance, speed = 56000000, 100800
```


## Operators

Arithmetic operators:

`+`, `-`, `*`, `/`, `%` (modulus)

Increment and assignment:

```go
var weight = 149.0
weight = weight * 0.3783
weight *= 0.3783
```

```go
var age = 41
age = age + 1 happy birthday! age += 1
age++
```

Comparison operators:

`==`, `!=`, `<`, `>`, `<=`, `>=`

Logical operators:

`||` or, `&&` and, `!` not


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


## Random number

```go
package main

import (
  "fmt"
  "math/rand"
)

func main() {
  // rand.Intn(10) returns a number from 0–9
  var num = rand.Intn(10) + 1
  fmt.Println(num)
}
```