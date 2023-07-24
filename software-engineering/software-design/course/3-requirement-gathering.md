# Requirements Gathering

## Software Development Process

Software development generally follows a process, which involves taking a problem and creating a solution through iterative stages of: 

- requirements gathering
- design mock-ups
- technical designs
- software implementation
- testing

Skipping the requirements and design stages can lead to project failure due to incorrect assumptions. It is important to spend time on these stages to ensure the right product is created.


## Requirements

Requirements are conditions or capabilities that must be implemented in a product based on client or user request. 

It is important to ask for more than simply the client’s vision to elicit requirements. Eliciting requirements involves actively probing the client vision, clarifying what may not have been told, and asking questions about issues the client may not have even considered. 

This allows you to understand the full scope of what you need to build and what your client wants in a product before you actually start coding.

In addition to establishing specific needs for the project, it is also important to establish potential trade-offs the client may need to make in the solution. For example, a client may decide to sacrifice a feature in order to ensure that a program runs faster, if speed is an important need.

Once requirements and trade-offs are established, they may serve as the foundation for design.

*To better understand requirements, imagine you are an architect building a house. Requirements allow you to understand what a homeowner wants in a house before you start building.*

*The homeowner may tell you what rooms they want, but you may need to ask follow-up questions about what rooms may be missing from their list, what size the house and rooms might be, any constraints on the house based on restrictions, how clients want rooms to be placed, or what direction the house should face. These help you better understand what you will be building.*


### User Stories

A big part of building a software system is determining what the customer wants. We call these requirements.

There are many techniques for eliciting or discovering requirements from a customer or user.

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