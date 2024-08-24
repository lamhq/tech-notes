# Class diagrams

## Snippet

````mdx filename="Markdown"
```mermaid
---
title: Animal example
---
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    class Animal {
        +String gender
        +isMammal()
        +someAbstractMethod()*
    }
    class Duck{
        +String beakColor
        #swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat() bool
        -doSth(int arg) int
    }
```
````

```mermaid
---
title: Animal example
---
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    class Animal {
        +String gender
        +isMammal()
        +someAbstractMethod()*
    }
    class Duck{
        +String beakColor
        #swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat() bool
        -doSth(int arg) int
    }
```


## Class members
````mdx filename="Markdown"
```mermaid
classDiagram
    class BankAccount {
        +String owner
        +deposit(amount)
        +withdrawal(amount)
    }
```
````

```mermaid
classDiagram
    class BankAccount {
        +String owner
        +deposit(amount)
        +withdrawal(amount)
    }
```


## Return type

````mdx filename="Markdown"
```mermaid
classDiagram
    class BankAccount {
        +deposit(amount): bool
        +withdrawal(amount): int
    }
```
````

```mermaid
classDiagram
    class BankAccount {
        +deposit(amount): bool
        +withdrawal(amount): int
    }
```


## Visibility

- `+` Public
- `-` Private
- `#` Protected
- `~` Package/Internal
- `*` Abstract: `someAbstractMethod()*`, `someAbstractMethod() int*`
- `$` Static:
  - `someStaticMethod()$`
  - `someStaticMethod() String$`
  - `String someField$`


## Relationship

- `<|--`: Inheritance
- `*--`: Composition
- `o--`: Aggregation
- `-->`: Association
- `--`: Link (Solid)
- `..>`: Dependency
- `..|>`: Realization
- `..`: Link (Dashed)

````mdx filename="Markdown"
```mermaid
classDiagram
classA <|-- classB : Inheritance
Animal <|--|> Zebra : two-way relations
classC *-- classD
classE o-- classF
```
````

```mermaid
classDiagram
classA <|-- classB : Inheritance
Animal <|--|> Zebra : two-way relations
classC *-- classD
classE o-- classF
```

### Cardinality / Multiplicity

- `1` Only 1
- `0..1` Zero or One
- `1..*` One or more
- `*` Many
- `n` n (where n>1)
- `0..n` zero to n (where n>1)
- `1..n` one to n (where n>1)

````mdx filename="Markdown"
```mermaid
classDiagram
    Customer "1" --> "*" Ticket
    Student "1" --> "1..*" Course
    Galaxy --> "many" Star : Contains
```
````

```mermaid
classDiagram
    Customer "1" --> "*" Ticket
    Student "1" --> "1..*" Course
    Galaxy --> "many" Star : Contains
```


## Class Annotation

- `<<Interface>>` To represent an Interface class
- `<<Abstract>>` To represent an abstract class
- `<<Service>>` To represent a service class
- `<<Enumeration>>` To represent an enum

````mdx filename="Markdown"
```mermaid
classDiagram
class Shape{
    <<interface>>
    noOfVertices
    draw()
}
class Color{
    <<enumeration>>
    RED
    BLUE
    GREEN
    WHITE
    BLACK
}
```
````

```mermaid
classDiagram
class Shape{
    <<interface>>
    noOfVertices
    draw()
}
class Color{
    <<enumeration>>
    RED
    BLUE
    GREEN
    WHITE
    BLACK
}
```


## Generic Types

````mdx filename="Markdown"
```mermaid
classDiagram
class Square~Shape~{
    int id
    List~int~ position
    setPoints(List~int~ points)
    getPoints() List~int~
}
```
````

```mermaid
classDiagram
class Square~Shape~{
    int id
    List~int~ position
    setPoints(List~int~ points)
    getPoints() List~int~
}
```


## Class Note

````mdx filename="Markdown"
```mermaid
classDiagram
    note "Note for the diagram"
    note for Duck "Note for a class\ncan help in debugging"
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
```
````

```mermaid
classDiagram
    note "Note for the diagram"
    note for Duck "Note for a class\ncan help in debugging"
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
```

## Namespace

A namespace groups classes.

````mdx filename="Markdown"
```mermaid
classDiagram
namespace BaseShapes {
    class Triangle
    class Rectangle {
        double width
        double height
    }
}
```
````

```mermaid
classDiagram
namespace BaseShapes {
    class Triangle
    class Rectangle {
      double width
      double height
    }
}
```

## Render direction

Setting the direction of the diagram:

````mdx filename="Markdown"
```mermaid
classDiagram
  direction RL
  class Student {
    -idCard : IdCard
  }
  class IdCard{
    -id : int
    -name : string
  }
  class Bike{
    -id : int
    -name : string
  }
  Student "1" --o "1" IdCard : carries
  Student "1" --o "1" Bike : rides
```
````

```mermaid
classDiagram
  direction RL
  class Student {
    -idCard : IdCard
  }
  class IdCard{
    -id : int
    -name : string
  }
  class Bike{
    -id : int
    -name : string
  }
  Student "1" --o "1" IdCard : carries
  Student "1" --o "1" Bike : rides
```
