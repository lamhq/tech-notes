# Object-Oriented Design

## Object-Oriented Thinking

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


## Design in the Software Process

Software development generally follows a process, which involves taking a problem and creating a solution through iterative stages of: 

- requirements gathering
- design mock-ups
- technical designs
- software implementation
- testing

Skipping the requirements and design stages can lead to project failure due to incorrect assumptions. It is important to spend time on these stages to ensure the right product is created.

### Requirements

Requirements are conditions or capabilities that must be implemented in a product based on client or user request. 

It is important to ask for more than simply the client’s vision to elicit requirements. Eliciting requirements involves actively probing the client vision, clarifying what may not have been told, and asking questions about issues the client may not have even considered. 

This allows you to understand the full scope of what you need to build and what your client wants in a product before you actually start coding.

In addition to establishing specific needs for the project, it is also important to establish potential trade-offs the client may need to make in the solution. For example, a client may decide to sacrifice a feature in order to ensure that a program runs faster, if speed is an important need.

Once requirements and trade-offs are established, they may serve as the foundation for design.

*To better understand requirements, imagine you are an architect building a house. Requirements allow you to understand what a homeowner wants in a house before you start building.*

*The homeowner may tell you what rooms they want, but you may need to ask follow-up questions about what rooms may be missing from their list, what size the house and rooms might be, any constraints on the house based on restrictions, how clients want rooms to be placed, or what direction the house should face. These help you better understand what you will be building.*

### User Stories

A big part of building a software system is determining what the customer wants. We call these requirements, and there are many techniques for eliciting or discovering requirements from a customer or user.

**User Stories**

Once a requirement is elicited, it needs to be expressed in some form.

One technique for expressing a requirement is called a **user story**.

A user story is a requirement stated in natural language from the perspective of an end-user.

A user story consists of three parts: user role, goal, and reason.

```
As a ______, I want to ______ so that ______.
```

Put the **user role** into the first blank, this clarifies who wants to use this feature.

In the second blank, put that **goal** that the user role wants to achieve. This will lead to some feature that you want to implement.

Put the **reason** why the user role wants this goal. Sometimes this clause is omitted if the benefits are clear and generally known.

After you fill in a user story, you can apply **object-oriented thinking** to it to discover objects and possibly further requirements!


**Example**:

Imagine that you introduce the user story tool to your client, and they give you the following sentence:

As an **online shopper**, I want to **add** an **item** to my **shopping cart**, so that I can **purchase** it.

Usually, the nouns correspond to objects in your software.

So in this example, you have identified three objects: first, the user is associated with an object in the software (the online shopper).

An **item** could be any product at the store, while a **shopping cart** is an object for storing items for purchase.

Verbs can help you identify the requirements that your objects might have. In this example, add and purchase might be responsibilities of the shopping cart.

Verbs may also help you identify connections between objects.

The last point is a bit more subtle; a user story can also help you discover connections between objects. In this example, it is probably fairly obvious. One online shopper is typically associated with one shopping cart. The shopping cart should be capable of holding multiple items.


## Where to learn more?

Software Project Management specialization provided by the University of Alberta and Coursera.


### Design

The next step in the process is to produce a conceptual design and a technical design. This results in the creation of two different kinds of artifacts: **conceptual mock-ups** and **technical diagrams**.

#### Conceptual Design

Conceptual designs are created with an initial set of requirements and recognize appropriate components, connections, and responsibilities of the software product.

Conceptual designs are expressed or communicated through conceptual mock-ups, which are visual notations that help to clarify design decisions with clients and users.

Mock-ups illustrate major components and connections but do not outline technical details, as those are deferred until the technical design stage.

Ultimately, conceptual designs help to ensure that important components are not missed and can be improved upon before moving to the technical design phase.

![Image: mockup](https://balsamiq.com/assets/wireframes/mytunez.gif)

*For example, let us return to the metaphor of building a house. The components for the architectural example of building a house might be: the lot the house will be built on, the house, and rooms inside the house. Connections might be how rooms are accessible to each other. The house has the responsibility of providing enough power, water, and support for all the components within it. Rooms in the house, such as the kitchen, may also have responsibilities, such as providing space for storing kitchenware, appliances, food supplies, plus power and water for meal preparation. However, specifics about wiring and plumbing are not mentioned in the conceptual design. These technical details cannot be fully addressed until the conceptual mock-ups are completely understood. For example, the size of the electrical distribution panel for the house will require adding up the power requirements of each of the rooms.*


#### Technical Design

Technical designs build on conceptual designs and requirements to define the technical details of a software solution.

It describes how technical designs break down components into smaller, more specific ones to be designed in detail, ensuring that each component has its technical details specified. 

Technical diagrams are used to communicate technical design, as they visualize how to address specific issues for each component. 

Technical diagrams help to coordinate development work and ensure that everyone involved in the project has a clear understanding of the technical details of the solution.

*To continue with the architectural example used throughout this lesson, imagine having to design a kitchen. A kitchen is a component of a house on its own, but it will require further smaller components, such as flooring. The technical design may indicate that the flooring will need to be made of a material that is easy to clean, particularly if the client plans on doing a lot of cooking— cooking can be a messy business!*


### Compromise in Requirements and Design

- Compromises may be necessary in the design phase to create an acceptable solution.
- Communication and feedback between client and project team are essential to achieving a feasible design that meets client needs within any restrictions.
- Designs may need to be reworked if they prove impossible to achieve in the technical design or fail to meet requirements.
- Larger systems generally require more design time due to more components, connections, and responsibilities to keep track of.
- Technical diagrams become the basis for constructing the intended solution once a feasible design has been agreed upon.
- There are many design techniques that may be used to get the most out of the design process.

*Drawing on the architectural example used throughout this lesson, imagine the client would like an open kitchen in their house that has no obstructions between it and the dining room. But what if a post and beam is needed in that area to support the second floor of the house? The homeowner and the project will need to work out a compromise in that situation.*