#  Dependency Inversion Principle

## Overview

Depend upon abstractions. Do not depend upon concrete classes.

It suggests that high-level components should not depend on our low-level components, both should depend on abstractions.


## High-Level Components

A high-level component represents complex business logic or application behavior.

It typically orchestrates interactions between other components.

Examples:
- **Service Layer**: Handles business logic, validation, and coordination.
- **Controller (in MVC)**: Manages user input, invokes services, and prepares data for views.
- **Use Case Classes**: Represent specific application use cases.


## Low-Level Components

A low-level component deals with specific technical details or basic operations.

It's often reusable and focused on a single responsibility.

Examples:
- **Data Access Layer (DAL)**: Interacts with databases or external APIs.
- **Utility Classes**: Provide common functionality (e.g., string manipulation, date formatting).
- **Infrastructure Components**: Wrappers for external services (e.g., AWS SDK, HTTP clients).


## Inversion

The term "inversion" refers to a shift in the traditional top-to-bottom dependency relationships between high-level and low-level components. 

With dependency inversion, the low-level components inverted themselves by depending on a higher-level abstraction. Likewise, the high-level component is also tied to the same abstraction.

By doing so, we achieve loose coupling and greater flexibility in our codebase.


## Example

We have a `PizzaStore` class with a `createPizza()` method that's responsible for making pizza:
```ts
class PizzaStore {
  createPizza(region: string, type: string): Pizza | null {
    let pizza: Pizza | null = null;
    if (region === "NY") {
      if (type === "cheese") {
        pizza = new NYStyleCheesePizza();
      } else if (type === "veggie") {
        pizza = new NYStyleVeggiePizza();
      } else if (type === "clam") {
        pizza = new NYStyleClamPizza();
      } else if (type === "pepperoni") {
        pizza = new NYStylePepperoniPizza();
      }
    } else if (region === "Chicago") {
      if (type === "cheese") {
        pizza = new ChicagoStyleCheesePizza();
      } else if (type === "veggie") {
        pizza = new ChicagoStyleVeggiePizza();
      } else if (type === "clam") {
        pizza = new ChicagoStyleClamPizza();
      } else if (type === "pepperoni") {
        pizza = new ChicagoStylePepperoniPizza();
      }
    } else {
      console.log("Error: invalid region of pizza");
    }
    
    if (pizza) {
      pizza.prepare();
      pizza.bake();
      pizza.cut();
      pizza.box();
    }
    return pizza;
  }
}
```

If we draw a diagram representing the `PizzaStore` and all the objects it depends on:

```mermaid
---
title: PizzaStore Dependencies
---
classDiagram
  PizzaStore --> NYStyleCheesePizza
  PizzaStore --> NYStyleVeggiePizza
```

The main problem with the `PizzaStore` is that it depends on every type of pizza because it actually instantiates concrete types in its `orderPizza()` method.

To get those instantiations out of the `orderPizza()` method, we apply the Factory Method Pattern. Then, our diagram looks like this:

```mermaid
---
title: PizzaStore Dependencies
---
classDiagram
  PizzaStore --> Pizza
  Pizza <-- NYStyleCheesePizza
  Pizza <-- NYStyleVeggiePizza
```

After applying Factory Method, you'll notice that our high-level component, the `PizzaStore`, and our low-level components, the pizzas, both depend on `Pizza`, the abstraction.


## Guidelines

The following guidelines can help you avoid OO designs that violate the Dependency Inversion Principle:
- **No variable should hold a reference to a concrete class**. If you use `new`, you'll be holding a reference to a concrete class. Use a factory to get around that.
- **No class should derive (inherit) from a concrete class**. If you derive from a concrete class, you're depending on a concrete class. Derive from an abstraction, like an interface or an abstract class.
- **No method should override an implemented method of any of its base classes**. If you override an implemented method, then your base class wasn't really an abstraction to start with. Those methods implemented in the base class are meant to be reused by  all your subclasses.

These guidelines are ideals to strive for, not strict rules.

Being aware of these guideline when you design help you know when you are violating the principle and you'll have a good reason for doing so.

If a class is unlikely to change, instantiating a concrete class isn't a major issue. If, on the other hand, a class you write is likely to change, you have some good techniques like Factory Method to encapsulate that change.

> In Java, we instantiate `String` objects frequently without concern. Does it violate principles? Yes. Is it okay? Yes, because `String` is very unlikely to change.
