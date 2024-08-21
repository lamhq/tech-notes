# UML

## Overview 

UML (Unified Modeling Language) is a standardized modeling language, that help in describing and designing software systems, particularly software systems built using the object-oriented (OO) style.

UML provides an integrated set of diagrams for various purposes, including business modeling and system design.


## Version

This document is for UML 2.

The current version is UML 2.5.1.


## UML Diagrams

UML 2 describes 13 official diagram types:

![](./uml/images/diagram-types.svg)

### Interaction Diagrams

Interaction diagrams describe how groups of objects collaborate in some behavior. 

Sequence diagrams represents the interaction between objects within a single use case.

State diagrams show the behavior of a single object across many use cases. 

Activity diagram illustrates the flow of activities or processes within a system, including decision points and parallel activities.

Communication diagrams for showing connections

Timing diagrams for showing timing constraints.


## UML in software processes

### Requirements Analysis

Figure out what the users want the system to do.

Useful UML techniques:
- **Use cases:** Describe user interactions with the system.
- **Class diagram:** Conceptual perspective to build a rigorous domain vocabulary.
- **Activity diagram:** Show workflow, interaction between software and human activities, context for use cases, and details of complex use cases.
- **State diagram:** Useful for concepts with interesting life cycles and state changes.

It's important to keep the notation to a minimum. Don't introduce anything that is specific to the software implementation.


### Design

You can get more technical with your diagrams. You can use more notation and be more precise about your notation.

Useful techniques:
- **Class diagrams**: show the classes in the software and how they interrelate.
- **Sequence diagrams** for common scenarios. Pick the most important and interesting scenarios from the use cases and use CRC cards or sequence diagrams to figure out what happens in the software.
- **Package diagrams** to show the large-scale organization of the software.
- **State diagrams** for classes with complex life histories.
- **Deployment diagrams** to show the physical layout of the software.

Waterfall and Iterative Design:
- With a waterfall life cycle, you create diagrams and activities for each phase, including the appropriate UML diagrams. Waterfall style usually uses UML as a blueprint.
- In an iterative style, UML diagrams can be used as either a **blueprint** or a **sketch**.

Blueprint:
- Analysis diagrams are usually built in the iteration before the functionality.
- Each iteration modifies existing documents, highlighting changes.
- Blueprint designs are done early and in pieces for targeted functionality. 
- Expect code to follow diagrams; deviations need review from the designers.
- Blueprints are hard to get right, even for good designers.

Sketch:
- A more fluid process.
- Spend a few days when starting an iteration to design sketches for it.
- Sketches are initial designs and can be changed during coding if needed.
- Implementors should use judgment to decide if changes require broader discussion.


### Documentation

UML diagrams useful for getting an overall understanding of a system and highlighting important parts. Detailed documentation should be generated from the code.

A **package diagram** makes a good logical road map of the system. It helps understand the logical pieces of the system and their dependencies.

A **deployment diagram** shows the high-level physical picture.

Within each package, **class diagram** are used with only important feature/operations are shown. Class diagram acts as a table of contents.

The class diagram should be supported by **interaction diagrams** that show the most important interactions in the system.

If a class has complex life-cycle behavior, a **state machine diagram** can be used to describe it.

If a particularly complex algorithm is involved, consider using an activity diagram only if it gives more understanding than the code.


### Understanding Legacy Code

Sketches of key classes in a package and their key interactions can help clarify what's going on.

Gsaenerating a sequence diagram to see how multiple objects col- laborate in handling a complex method.