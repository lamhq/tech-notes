# Block Diagrams

## Use Cases

- **Software Architecture**: showing how different modules or services interact, data flow, and high-level component interaction.
- **Network Diagrams**: depict how different network devices and services are interconnected, including routers, switches, firewalls, and the flow of data across the network.
- **Process Flowcharts**: Represent various stages of a business or manufacturing process, helping to visualize the sequence of steps, decision points, and the flow of control.
- **Electrical Systems**: Illustrate the high-level structure of an electrical system, the interaction between different electrical components, and the flow of electrical currents.
- **Educational Purposes**: explain complex concepts and systems in a simplified manner. breaking down and visualizing scientific theories, engineering principles, and technological systems.


## Block

Create a simple block diagram with three blocks:

```mermaid
block-beta
  a b c
```

## Columns

Defining the number of columns to use

```mermaid
block-beta
  columns 3
  a b c d
```

## Block label
```mermaid
block-beta
  a["block with label"] b
```
Setting block width:
```mermaid
block-beta
  columns 3
  a b:2 c:2 d
```

## Nested blocks
```mermaid
block-beta
    block
      C
      D
      block
        E
        F
      end
    end
    A
```


## Block Shape

Round Edged Block:
```mermaid
block-beta
    id1("This is the text in the box")
```

Stadium-Shaped Block:
```mermaid
block-beta
    id1(["This is the text in the box"])
```

Cylindrical Shape:
```mermaid
block-beta
    id1[("Database")]
```

Circle Shape:
```mermaid
block-beta
    id1(("This is the text in the circle"))
```

Rhombus:
```mermaid
block-beta
    id1{"This is the text in the box"}
```

More shapes can be found [here](https://mermaid.js.org/syntax/block.html#_4-block-varieties-and-shapes).


## Connecting Blocks

Basic Links:
```mermaid
block-beta
  A space B
  A-->B
```

Text on Links:
```mermaid
block-beta
  A space:2 B
  A-- "X" -->B
```