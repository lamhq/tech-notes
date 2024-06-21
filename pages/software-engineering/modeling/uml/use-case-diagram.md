# Use Case Diagram

## Overview

The purpose of a use case diagram in UML is to demonstrate the different ways that a user might interact with a system.

A use case diagram doesn't provide extensive detail (e.g., the order of steps are performed).


## Use case

- Representing the goals of system-user interactions
- Defining and organizing functional requirements in a system
- Specifying the context and requirements of a system (scope)
- Modeling the basic flow of events in a use case


## Components


### Actors

An actor can be a person, an organization, or an outside system that interacts with your application or system.

Actor triggers use case(s).

Actor has a responsibility toward the system (inputs), and Actor has expectations from the system (outputs).

Named by noun.

![](https://cdn-images.visual-paradigm.com/guide/uml/what-is-use-case-diagram/03-use-case-diagram-notation-actor.png)


### Use Cases

Use cases represent specific functionalities of the system. They are like scenes in a play.

Examples of use cases in an online shopping system could be "Place Order", "Track Delivery", or "Update Product Information".

Named by verb + Noun (or Noun Phrase).

![](https://cdn-images.visual-paradigm.com/guide/uml/what-is-use-case-diagram/04-use-case-diagram-notation-use-case.png)


### Communication Link

The participation of an actor in a use case is shown by connecting an actor to a use case by a solid link.

Actors may be connected to use cases by associations, indicating that the actor and the use case communicate with one another using messages.

![](https://cdn-images.visual-paradigm.com/guide/uml/what-is-use-case-diagram/05-use-case-diagram-notation-communication-link.png)


### System Boundary

The system boundary defines the scope or limits of the system being modeled.

It distinguishes between elements inside the system and those external to it.

For large and complex systems, each module may be the system boundary.

![](https://cdn-images.visual-paradigm.com/guide/uml/what-is-use-case-diagram/06-use-case-diagram-notation-system-boundary.png)


## Use Case Relationship

Use cases share different kinds of relationships.

The reuse of an existing use case by using different types of relationships reduces the overall effort required in developing a system.

Defining the relationship between two use cases is the decision of the software analysts of the use case diagram.

### Include

When a use case is depicted as using the functionality of another use case, the relationship between the use cases is named as include or uses relationship.

A use case includes the functionality described in another use case as a part of its business process flow.

An include relationship is depicted with a directed arrow having a dotted line. The tip of arrowhead points to the child use case and the parent use case connected at the base of the arrow.

![](https://cdn-images.visual-paradigm.com/guide/uml/what-is-use-case-diagram/08-use-case-diagram-notation-include.png)


### Extend

Depict with a directed arrow having a dotted line. The tip of arrowhead points to the base use case and the child use case is connected at the base of the arrow.

![](https://cdn-images.visual-paradigm.com/guide/uml/what-is-use-case-diagram/07-use-case-diagram-notation-extend.png)


### Generalization

A generalization relationship is a parent-child relationship between use cases.

The child use case is an enhancement of the parent use case.

The child use case is connected at the base of the arrow. The tip of the arrow is connected to the parent use case.

![](https://cdn-images.visual-paradigm.com/guide/uml/what-is-use-case-diagram/08-use-case-diagram-notation-generalization.png)


## Example

### Online Shopping System

![](https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/what-is-a-use-case-diagram-in-UML/UML_use_case_example-800x707.PNG)


### Document sharing website

![](https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/what-is-a-use-case-diagram-in-UML/UML_use_case_example1-750x731.png)


## References

- [UML Use Case Diagram Tutorial](https://www.lucidchart.com/pages/uml-use-case-diagram)
- [What is Use Case Diagram?](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-use-case-diagram/)