# Model Checking

In addition to understanding software system design techniques, it is important to know how to verify the system for errors. 

Model checking is one such technique that systematically checks a system's state model in all possible states to find errors that other tests cannot.

## How Model Checking Works

Model checking involves simulating different events that would change the states and variables of the software to identify any errors. This exposes flaws by notifying you of any violation of the rules that occur in the behavior of the state model. 

## Conducting Model Checking

Model checking begins by generating a state model from the code, followed by a check to ensure the state model conforms to certain behavioral properties. The process has three phases:

1. **Modelling Phase:** In this phase, the model description is entered in the same programming language as the system, and any desired properties are also described. Sanity checks are performed to catch simple errors before using model checkers.

2. **Running Phase:** The model checker is run to see how the model conforms to the desired properties described in the modeling phase.

3. **Analysis Phase:** All desired properties are checked to be satisfied, and if there are any violations, called counterexamples, the model checker should provide descriptions of violations in the system, so you can analyze how they occurred.

Information provided by the model checker allows developers to revise their software and fix any problems. Once fixed, running the model checker again is good practice until the software meets the desired properties.

## Example of Model Checking in Practice

Consider software with a rule not to produce a deadlock. If the system cannot continue because two tasks are waiting for the same resource, the model checker would simulate the different states that could occur in your system. If a deadlock were possible, it would provide details of this violation.

Model checking helps ensure software is both well-designed and meets desired properties and behaviors, functioning as intended.