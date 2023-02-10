# Control flow

## `if`

```go
if command == "go east" {
  fmt.Println("You head further up the mountain.")
} else if command == "go inside" {
  fmt.Println("You enter the cave where you live out the rest of your life.")
} else {
  fmt.Println("Didn't quite get that.")
}
```

```go
if !haveTorch || !litTorch {
  fmt.Println("Nothing to see here.")
}
```


## `switch`

```go
switch command {
  case "go east":
    fmt.Println("You head further up the mountain.")

  case "enter cave", "go inside":
    fmt.Println("You find yourself in a dimly lit cavern.")

  case "read sign":
    fmt.Println("The sign reads 'No Minors'.")

  default:
    fmt.Println("Didn't quite get that.")
}
```

```go
switch {
  case room == "cave":
    fmt.Println("You find yourself in a dimly lit cavern.")

  case room == "lake":
    fmt.Println("The ice seems solid enough.")
    fallthrough

  case room == "underwater":
    fmt.Println("The water is freezing cold.")
}
```


## `for`

```go
var count = 10
for count > 0 {
  fmt.Println(count)
  time.Sleep(time.Second)
  count--
}
```

```go
var degrees = 0
for {
  degrees++
  
  if degrees >= 360 {
    degrees = 0
    if rand.Intn(2) == 0 {
      break
    }
  }
}
```
