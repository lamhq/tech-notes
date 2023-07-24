# Object-Oriented Thinking

Object-oriented thinking involves breaking down problems and concepts into component parts and representing them as objects in code.

Objects have associated details and behaviours, which keep code **organized**, **flexible**, and **reusable**.

Even inanimate objects can be self-aware in software production to help represent things in a codebase.

It is good practice to familiarize oneself with object-oriented thinking to prepare for object-oriented design.

## Categories of Objects in Design

### Entity Objects
- Correspond to some real-world entity in the problem space
- Know attributes about themselves and can modify themselves
- Initially identified when breaking down objects into smaller objects

### Boundary Objects
- Sit at boundary between systems
- Objects that deal with other software systems, the Internet, or show information to users
- Commonly used in user interface programming

### Control Objects
- Responsible for coordination
- Discovered during object breakdown when an object controls other objects. You find that it would be useful to have an object that controls the other objects.
- Examples include the Mediator pattern. It simply coordinates the activities of many different objects so that they can stay loosely coupled.

### Categories of Objects in Action
- Software will not solely consist of entity objects
- There must also be objects for coordination and for interfacing with outside systems.
- Organizing code into these categories allows for flexibility, reusability, and maintainability.
