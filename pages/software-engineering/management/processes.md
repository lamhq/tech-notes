# Processes

## Waterfall

The waterfall style breaks down a project based on activity.

For example, a 1-year project might have:
- a 2-month analysis phase
- a 4-month design phase
- a 3-month coding phase
- a 3-month testing phase.

With waterfall development, formal handoffs occur between phases, but backflows can happen:
- During coding, issues may require revisiting analysis and design.
- Don't assume design is complete when coding starts; some decisions will need revisiting later.

Backflows are exceptions and should be minimized as much as possible.

It's hard to tell if a project is on track with a waterfall process.


## Interactive

The iterative style breaks down a project by subsets of functionality.

For example, you might take a one-year project and break it into 3-month iterations:
- The first iteration, you'd take a quarter of the requirements and do the complete software life cycle for that quarter: analysis, design, code, and test. At the end of the first iteration, you'd have a system that does a quarter of the needed functionality.
- Then you'd do a second iteration, so that at the end of 6 months, you'd have a system that does half the functionality.

With iteration, an initial exploration phase captures high-level requirements and design decisions to guide subsequent iterations. Each iteration aims to deliver production-ready software but often requires a stabilization period for final bug fixes.

Activities like user training are typically deferred until the end.

The system may not go into production after each iteration, but it should be of production quality. Regular production releases are beneficial for early value and better feedback, often resulting in multiple releases composed of several iterations.

Iterative processes, with repeated production of tested, integrated software, provide better early warnings of issues and can tell whether you are on track or not.


### Time boxing

A technique that forces an forces an iteration to be a fixed length of time.

If you can't complete everything intended, remove some functionality instead of extending the iteration.

Consistent iteration lengths create a regular build rhythm.

People usually struggle with removing functionality. Regular practice helps them make better choices between delaying a release and reducing features. It also clarifies priority requirements.


## Hybrid

There's a **staged delivery** life cycle whereby analysis and high-level design are done first, in a waterfall style, and then the coding and testing are divided up into iterations.

For example, a project might have 4 months of analysis and design followed by four 2-month iterative builds of the system.