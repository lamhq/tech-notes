# Object-oriented Design

## Goal

The goals of Object-oriented Design is to build software so that we can make changes with the least possible impact on the existing code. Less time reworking code, fewer bugs.


## Features of Good Design

### Code reuse

Code reuse is one of the most common ways to reduce development costs.

Instead of developing something over and over from scratch, we reuse existing code in new projects.

Lower development costs mean more money is left for marketing and a broader reach to potential customers.

Challenges: making existing code work in a new context usually takes extra effort. Existing code isn't flexible:
- Tight coupling between components (dependencies on concrete classes instead of interfaces)
- Hardcoded operations

Using design patterns is one way to increase flexibility of software components and make them easier to reuse. However, this sometimes make the code more complicated.

Levels of code reuse:
- Class reuse. This involves reusing individual classes, such as class libraries or containers.
- Pattern reuse. Patterns let you reuse design ideas and concepts independently of concrete code. It's less risky than building a framework, which requires a significant investment
- Framework reuse. They identify the key abstractions for solving a problem, represent them by classes and define relationships between them. You hook into frameworks by subclassing somewhere, and it will call you when it's your turn to do something.


### Extensibility

Change is the only constant thing in a programmer's life. There are several reasons why this happens:
- We understand problems better as we solve them. After finishing the first version of an app, you gain insights and your skills improve, your current code look like crap.
- Something beyond your control has changed. For example, developers have been reworking or migrating their Flash-based applications as browsers drop support for Flash.
- The goalposts move. Your client wants additional changes for features not in the original plan, inspired by your first version.

That's why all seasoned developers try to provide for possible future changes when designing an application's architecture.

Bright side: if someone asks you to change something in your app, that means someone still cares about it.
