# Getting Started

## Install Go

Just use the [Download and install](https://go.dev/doc/install) steps.


## `go.mod` file

The file `go.mod` is a module file. It defines the module, its dependencies, and other metadata that's used by the Go tooling to manage those dependencies, resolve conflicts between different modules, and enforce version compatibility.

That `go.mod` file stays with your code, including in your source code repository.

To create a `go.mod` file, run the `go mod init` [command](https://go.dev/ref/mod#go-mod-init), giving it the name of the module your code will be in. For more about naming a module with a module path, see [Managing dependencies](https://go.dev/doc/modules/managing-dependencies#naming_module).


## Create the first project

```bash
mkdir hello
cd hello
```

Create a `go.mod` file:

```bash
go mod init example/hello
```

In your text editor, create a file `hello.go` in which to write your code:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

Run your code:

```bash
go run .
```

The `package` keyword declares the package this code belongs to. All code in Go is organized into packages.

The `import` keyword specify packages this code will use. Packages contain any number of functions.

The `func` keyword declares a function, in this case a function named `main`.

The `main` identifier is special. When you run a program written in Go, execution begins at the `main` function in the main package. Without `main`, the Go compiler will report an error, because it doesn’t know where the program should start.

Every time you use a function from an imported package, the function is prefixed with the package name and a dot.

```go
fmt.Println("Hello, World!")
```

## The one true brace style

Go is picky about the placement of curly braces `{}`.

The opening braces should be placed on the same line as the preceding keyword, and closing braces should be placed on a new line, indented to align with the keyword.