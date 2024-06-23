# Class Diagrams

## Overview
A class diagram is a graphical notation that describes the types of objects in the system and relationships among them.

Class diagrams also show the properties and operations of a class and the constraints that apply to the way objects are connected.

The term **feature** covers properties and operations of a class.

## Class

A class represent a concept which encapsulates state (attributes) and behavior (operations).

Each attribute has a type. Each operation has a signature. The class name is the only mandatory information.

![](https://cdn-images.visual-paradigm.com/guide/uml/uml-class-diagram-tutorial/02-class-notation.png)

### Attributes

- Attributes are shown in the second partition.
- The attribute type is shown after the colon.
- Attributes map onto member variables (data members) in code.


### Operations

- Operations are shown in the third partition. They are services the class provides.
- The return type of a method is shown after the colon at the end of the method signature.
- The type of method parameters are shown after the colon following the parameter name.
- Operations map onto class methods in code

![](https://cdn-images.visual-paradigm.com/guide/uml/uml-class-diagram-tutorial/03-class-notation-with-examples.png)


### Visibility

The `+`, `-` and `#` symbols before an attribute and operation name in a class denote the visibility of the attribute and operation.

![](https://cdn-images.visual-paradigm.com/guide/uml/uml-class-diagram-tutorial/04-class-attributes-with-different-visibility.png)

- `+` denotes public attributes or operations
- `-` denotes private attributes or operations
- `#` denotes protected attributes or operations


## Notes and Comments

Notes can stand on their own, or they can be linked with a dashed line to the elements they are commenting.

They can appear in any kind of diagram.

![](https://i.sstatic.net/Jv9UO.png)


## Guidelines

- **Start Simple:** Use basic elements like classes, associations, attributes, and generalization.
- **Key Focus:** Model only key areas; maintain a few updated diagrams.
- **Combine Techniques:** Integrate class diagrams with behavioral techniques for better understanding.


## References

- [UML Class Diagram Tutorial](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/uml-class-diagram-tutorial/)
