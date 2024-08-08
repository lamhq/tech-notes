# Open-Closed Principle

## Overview

Classes should be open for extension, but closed for modification.

- "Open for extension": classes are designed to allow behavior to be extended without the need to modify existing code.
- "Closed for modification": making changes to existing code can increase the risk of introducing new bugs and require effort for testing.

Our goal is to allow classes to be easily extended to incorporate new behavior without modifying existing code.


## Benefits

Following this principle ensures designs are resilient to change and flexible enough to adapt to new requirements.


## FAQs

**How to create design that is extensible yet closed for modification?**

Making OO design flexible and open to extension without modifying existing code takes time and effort.

By using design patterns, they give us time-tested designs that protect your code from being modified by supplying a means of extension.


**How can I make every part of my design follow the Open-Closed Principle?**

Usually, you can't. 

Following the Open-Closed Principle usually introduces new levels of abstraction, which adds complexity to our code.

Applying the Open-Closed Principle EVERYWHERE is wasteful and unnecessary, and can lead to complex, hard-to-understand code.


**Where to apply the Open-Closed principle?**

Focus on areas are most likely to change in your designs, and apply principles there.

To identify the areas of change that are most important, this involves both experience in designing object-oriented systems and understanding the specific domain you're working in.
