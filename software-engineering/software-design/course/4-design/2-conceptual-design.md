# Conceptual Design

Conceptual designs are created with an initial set of requirements and recognize appropriate components, connections, and responsibilities of the software product.

Conceptual designs are expressed or communicated through conceptual mock-ups, which are visual notations that help to clarify design decisions with clients and users.

Mock-ups illustrate major components and connections but do not outline technical details, as those are deferred until the technical design stage.

Ultimately, conceptual designs help to ensure that important components are not missed and can be improved upon before moving to the technical design phase.

![Image: mockup](https://balsamiq.com/assets/wireframes/mytunez.gif)

*For example, let us return to the metaphor of building a house. The components for the architectural example of building a house might be: the lot the house will be built on, the house, and rooms inside the house. Connections might be how rooms are accessible to each other. The house has the responsibility of providing enough power, water, and support for all the components within it. Rooms in the house, such as the kitchen, may also have responsibilities, such as providing space for storing kitchenware, appliances, food supplies, plus power and water for meal preparation. However, specifics about wiring and plumbing are not mentioned in the conceptual design. These technical details cannot be fully addressed until the conceptual mock-ups are completely understood. For example, the size of the electrical distribution panel for the house will require adding up the power requirements of each of the rooms.*


## Class Responsibility Collaborator

CRC (Class, Responsibility, Collaborator) cards are used to record, organize, and refine the components of system design.

They help represent components, responsibilities, and connections at a high level during conceptual design, allowing for better refinement of components in software design. 


### How to use CRC Cards

CRC cards are designed with three sections: class name, responsibilities of the class, and collaborators.

Components' names are placed in the class name section, responsibilities in the responsibilities section, and connections or collaborators that indicate other classes that the class interacts with to fulfill its responsibilities are captured in the collaborators section.

![Image: CRC card](https://media.springernature.com/lw685/springer-static/image/chp%3A10.1007%2F978-1-4842-4206-3_23/MediaObjects/470826_1_En_23_Figa_HTML.jpg)

This process is repeated iteratively until all classes, responsibilities, and collaborators are identified for a system.

CRC cards should be organized by placing closely collaborating components together to facilitate discussions or simulations with software development team meetings, visually explain a system, and gain potential input from other parties.


### Benefits of Using CRC Cards

Using CRC Cards helps sort information into manageable pieces, which can be physically reorganized to explore a system's theoretical workings, identify shortcomings in design, and play around with alternative designs. 

CRC cards can also be used to prototype and simulate a system for conceptual design.
