# Getting Started

## What are micro frontends?

Working with a small team on a new project is efficient, but as the scope and team size increase, productivity decreases due to knowledge silos and increased complexity.

To mitigate this effect, projects are often divided into multiple pieces by technology, creating horizontal layers with separate frontend and backend teams.

Micro frontends are an architectural approach and not a specific technique.

With the **micro frontends** approach, the application gets **divided into multiple vertical slices that span from database to user interface**. Each vertical system is smaller and more focused. It’s therefore easier to under- stand, test, and refactor than a monolith

This approach is related to the microservices architecture. But the main difference is that a service also includes its user interface.

![](https://devblogs.microsoft.com/startups/wp-content/uploads/sites/66/2021/02/microfrontends.png)


## Systems and teams

In micro frontends architecture, software systems are arranged vertically. Each system is autonomous and has its own data store.

One system is owned by one team, which works on the complete stack of the software from top to bottom. The teams have their areas of expertise and a clear user-focused mission, aligned along the customer journey.

![](https://micro-frontends.org/ressources/diagrams/organisational/verticals-headline.png)

Micro frontends remove the team barrier between frontend and backend developers by introducing cross-functional teams.

In contrast to specialist teams, interdisciplinary teams that include frontend and backend engineers, along with operations and business people, are becoming popular.

Cross-functional teams have the added benefit of involving all members in feature development and contributing to providing the best user experience for the area they work on. All members self-identify with the product.

![](https://content.altexsoft.com/media/2023/03/word-image-7.png)


## The frontend

Teams have end-to-end responsibility for a given functionality. They deliver the associated user interface as a micro frontend.

A micro frontend can be a complete page or a fragment that other teams include.

A team generates the HTML, CSS, and JavaScript necessary for a given feature. To make life easier, they might use a JavaScript library or framework to do that. **Teams don’t share library and framework code.**


### Pages

Each team could build their own pages, serve them from their application, and make them accessible through a public domain. You could connect these pages via links so that the end-user can navigate between them. Basically, yes. In the real world, you have require- ments that make it more complicated.

But now you understand the gist of the micro frontends architecture:
- Teams can work autonomously in their field of expertise.
- Teams can choose the technology stack that fits best for the job at hand.
- The applications are loosely coupled and only integrate in the frontend (e.g., via links).


### Fragments

The concept of pages is not always sufficient. Typically you have elements that appear on multiple pages, like the header or footer. You do not want every team to re-implement them. This is where fragments come in.

A page often serves more than one purpose, and might show information or provide functionality that another team is responsible for.

A team can decide to include functionality from another team by adding it some- where on the page.

Some fragments might need context information, like a product reference for the Related Products block.

Other fragments like the Mini Basket bring their own internal state. But the team that is including the fragment in their code does not have to know about state and implementation details of the fragment.

![](https://micro-frontends.org/ressources/screen/three-teams.png)


## Frontend integration

Frontend integration describes the set of tools and techniques you use to combine the team’s UIs into a coherent application for the end user. 

### Routing and Page Transitions

We need a system to get from a page owned by Team A to a page owned by Team B. The solutions can be straightforward. You can achieve this by merely using an HTML link.

If you want to enable client-side navigation, which renders the next page without having to do a reload, you can implement this by having a shared **application shell** or using a meta-framework like `single-spa`.


### Composition

Composition is the process of getting the fragments and putting them in the right slots.

There are dif- ferent ways of achieving this. You can group the solutions into two categories:
- Server-side composition, for example with SSI, ESI, Tailor or Podium
- Client-side composition, for example with iframes, Ajax, or Web Components


### Communication

In our exam- ple, the Mini Basket should update after clicking the Buy button. The Recommendation Strip should update its product when the customer changes the color on the detail page.


## Shared topics

To ensure a good end result and avoid redundant work, it’s important to address topics like web performance, design systems, and knowledge sharing from the start.

### Web performance

Because we assemble a page from fragments made by multiple teams, we often end up with more code that our user must download. It’s crucial to have an eye on the perfor- mance of the page from the beginning.

### Design system

To ensure a consistent look and feel for the customer, it is wise to establish a common design system.

A design system for the web includes elements like buttons, input fields, typography, or icons.

### Sharing Knowledge

It’s not productive when every team builds an error-logging infrastructure on their own. Picking a shared solution or at least adopting the work of other teams helps you to stay focused on your mission.

You need to create spaces and rituals that enable information exchange regularly between teams.


## What problems do micro frontends solve?

### Optimize for feature development

Companies choose the micro frontends architecture to increase development speed.

In a layered architecture, multiple teams are involved in building a new feature, which can cause delays due to waiting time between teams and formal communication channels.

With the micro frontends model, all people involved in creating a feature work in the same team, reducing waiting time between teams and making communication faster and less formal.

Iteration is quicker, with no waiting for other teams or discussion about prioritization, even though the amount of work that needs to be done remains the same.

### No more frontend monolith

With micro frontends, the application, including the frontend, gets split into smaller vertical systems. Each team has its own smaller frontend.

A micro frontend
- Is independently deployable
- Isolates the risk of failure to a smaller area
- Is narrower in scope and thereby easier to understand
- Has a smaller codebase that can help when you want to refactor or replace it
- Is more predictable because it does not share state with other systems


### Be able to keep changing

**Adopt new technologies**

Frontend technology is changing fast. Having an easy way to evolve your application is a valuable asset.

**Legacy**

Dealing with legacy systems is also becoming more prevalent in frontend development, with a lot of developer time spent on refactoring legacy code and coming up with migration strategies. When you are building an application of a specific size and want to stay competitive, it’s essential to be able to move to new technologies when they provide value for your team.

**Local decision making**

With the micro frontends approach, teams have full control over their technology stack and can introduce and verify new technologies in an isolated part of their application without having to coordinate with other teams or come up with grand migration plans.

This autonomy enables teams to make decisions and switch technologies based on what makes sense for their use case, without having to adhere to the opinions of other teams or deal with the risks involved in switching at a larger scale.


### Benefits of independence

**Self-contained**

Pages and fragments are self-contained. That means they bring their own markup, styles, and scripts, and should not have shared runtime dependencies.

This isolation makes it possible for a team to deploy a new feature in a fragment without having to consult with other teams first.

At first sight, it sounds wasteful that every team brings their own assets. This is par- ticularly true when all teams are using the same stack. But this mode of working enables teams to move much faster and deliver features more quickly.

**Shared nothing**

*Why don’t we build a large React application where every team is responsible for different parts of it? One team only works on the compo- nents of the product page; the other team builds the checkout pages. One source code repository, one React application.*

The reasoning behind this is the realization that communication between teams is expensive—really expensive. The more people you have, the more cumbersome this gets.

*When you want to change a piece that others rely on, be it just a utility library, you have to inform everyone, wait for their feedback, and maybe discuss other options.*

The goal is to share as little as possible to enable faster feature development. Every shared piece of code or infrastructure has the potential for creating a non-trivial amount of management overhead.

The reasoning behind this shared-nothing architecture is that the costs associated with these redundancies are smaller than the negative impacts that inter-team depen- dencies introduce.


## The downsides of micro frontends

### Redundancy

Having multiple teams side by side that build and run their own stack introduces a lot of redundancy.

Every team needs to set up and maintain its own application server, build process and continuous integration pipeline, and might ship redundant Java- Script/CSS code to the browser.

- A critical bug in a popular library can’t be fixed in one central place. All teams that use it must install and deploy the fix themselves.
- When one team has put in the work to make their build process twice as fast, the other teams don’t automatically benefit from this change. This team has to share this information with the others. The other teams have to implement the same optimization on their own.


### Guaranting Consistency

This architecture requires all teams to have their own database to be fully indepen- dent. But sometimes one team needs data that another team owns.

*In cases such as an online store where all teams need to know what products are offered, a typical solution is data replication using an event bus or a feed system. *

While this approach allows for each team to have access to the data they need, it can introduce latency and inconsistencies.

*Changes in price or availability might be inconsistent for brief periods of time, which can result in trade-offs between robustness and guaranteed consistency.*

When everything works as expected, delays caused by data replication mechanisms may only last milliseconds or seconds, but when something goes wrong, latency durations can become longer.


### Heterogeneity

The significant advantages of micro frontends is the free technology choice it offers to development teams. However, it can also be a controversial point as having different technology stacks can make it harder for developers to switch between teams or share best practices.

While micro frontends allow for free technology choice, it does not necessarily mean that all teams must use different technologies. Even when utilizing the same technologies, the benefits of autonomous version upgrades and reduced communication overhead remain.

The level of heterogeneity in projects can differ, ranging from having everyone use the same technology to having a list of proven technologies for each team to choose from.

It's important for development teams to discuss the level of freedom and tech diversity acceptable for their project and company upfront to ensure everyone has a clear understanding of what is expected.

### More frontend code

The micro frontends model typically comes with more code for the browser. It’s vital to address web performance from the start.

### Productivity versus overhead

Dividing an application into autonomous systems has many benefits but also adds additional costs.

**Setup**

When setting up the system, it is important to establish good team boundaries and a clear integration strategy. Common rules and practices should be agreed upon by all teams, like using namespaces, and ways for knowledge exchange should be provided.

**Organizational complexity**

Having smaller vertical systems reduces technical complexity, but it increases organizational complexity when running distributed systems. Unlike monolithic applications, new problems arise when deciding which team should handle issues like adding items to the basket or dealing with changes in runtime environments.

An extra shared service for frontend integration might be necessary, which could add another layer of maintenance work. However, if done right, the benefits should outweigh the added complexity in terms of increased productivity and motivation.


## When do micro frontends make sense?

### Good for medium-to-large projects

Micro frontends architecture is a technique that makes scaling projects easier.

In practice, the perfect team size is between 5 to 10 people. When the team exceeds 10 people, it’s worthwhile considering a team split.

Doing a vertical micro frontend-style split is an option you should look into.


### Works best on the web

Native applications for controlled platforms like iOS or Android are monolithic by design. Composing and replacing functionality on the fly is not possible.

When you have to implement native UI, it’s hard to have multiple end-to-end teams working on it without stepping on each other’s toes.


## Where micro frontends are not a great fit?

### Team size is small

If you only have a handful of developers and communication is no issue, the introduction of micro frontends won’t bring much value.

### Lacking domain knownledge

To make good vertical cuts it’s important to know your company’s domain well.

A team should have a clear mission like “Help the customer to find the product they are looking for.”.

Unclear or overlapping team missions will lead to uncertainty and long discussions.

### Business change rapidly

 Changing responsibilities afterward works but creates friction.


### Develop on different platforms

If you need to create a lot of different apps and native user interfaces to run on every device, that might also become tricky for one team to handle.
