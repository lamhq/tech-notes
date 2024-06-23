# Sequence Diagrams

## Overview

Sequence diagrams show the collaborations of several objects and the messages that are passed between these objects within a single use case.


## Use cases

Represent the details of a UML use case.

Model the logic of a sophisticated procedure, function, or operation.

See how objects and components interact with each other to complete a process.

Plan and understand the detailed functionality of an existing or future scenario.


## Components

### Object symbol

Represents a class or object.

Name in the box can follow the format: `object name: class name`

Class attributes should not be listed in this shape.

<img  alt="object Symbol" src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-object-symbol.svg" width="100" />


### Activation box

Represents the time needed for an object to complete a task.

The longer the task will take, the longer the activation box becomes.

<img  alt="Activation box" src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-activation-box-symbol.svg" width="50" />


### Actor symbol

Shows entities that interact with or are external to the system.

<img  alt="Actor symbol" src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-actor-symbol.svg" width="80" />


### Package symbol

Contain interactive elements of the diagram.

Also known as a frame.

<img  alt="Package symbol" src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-package-symbol.svg" width="200" />


### Lifeline symbol

Represents the passage of time.

Extends downward.

Shows the sequential events that occur to an object during the charted process.

Lifelines may begin with a labeled rectangle shape or an actor symbol.

<img  alt="Lifeline symbol" src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-lifeline-symbol.svg" width="150" />


### Loop symbol

<img  alt="Option loop symbol" src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-option-loop-symbol.svg" width="150" />


### Alternative symbol

Used to model if/then scenarios.

To represent alternatives, use the labeled rectangle shape with a dashed line inside.

<img  alt="Alternative symbol" src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-alternative-symbol.svg" width="150" />


## Message Symbols

Symbols show how information is transmitted between objects. 

They can be thought of as methods provided by the object.

### Synchronous message symbol

When a sender must wait for a response to a message before it continues. The diagram should show both the call and the reply.

<img src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-synchronous-message-symbol.svg" width="150" />


### Asynchronous message symbol

Asynchronous messages don't require a response before the sender continues.

Only the call should be included in the diagram.

<img src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-asynchronous-message-symbol.svg" width="150" />


### Asynchronous return message symbol

Represented by a dashed line with a lined arrowhead.

<img src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-return-message-symbol.svg" width="150" />


### Asynchronous create message symbol

This message creates a new object.

<img src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-create-message-symbol.svg" width="150" />


### Delete message symbol

This message destroys an object.

<img src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/discovery/UML/UML-Sequence/uml-deleted-message-symbol.svg" width="150" />


## Examples

### Modeling a class method

Pseudocode for a method `dispatch` of `Order` class:
```
procedure dispatch:
  foreach (lineitem):
    if (product.value > $10K):
      careful.dispatch
    else:
      regular.dispatch
    end if
  end for
  
  if (needsConfirmation):
    messenger.confirm
end procedure
```

![](./images/sequence-diagram-class-method.png)


### ATM systems

Process of patrons to access their bank accounts

![](https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/sequence-diagram-for-ATM-system-UML/sequence_diagram_atm_example-800x1292.png)
