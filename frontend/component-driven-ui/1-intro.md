# Component Driven User Interfaces

The development and design practice of building user interfaces with modular components.

UIs are built from the "bottom up" starting with basic components then progressively combined to assemble screens.

## What are components?

Components are standardized, interchangeable building blocks of UIs. They encapsulate the appearance and function of UI pieces.

Think LEGO bricks. LEGOs can be used to build everything from castles to spaceships; components can be taken apart and used to create new features.


## Why components?

UIs become unwieldy as applications grow. Large UIs are brittle, painful to debug, and time consuming to ship. Breaking them down in a modular way makes it easy to build robust yet flexible UIs.

Components enable interchangeability by isolating state from application business logic. That way, you can decompose complex screens into simple components.

Each component has a well-defined API and fixed series of states that are mocked. This allows components to be taken apart and recomposed to build different UIs.


## How to be Component Driven

- Build one component at a time: Avatar, Button, Input, Tooltip
- Combine components. Compose small components together to unlock new features while gradually increasing complexity. (Form, Header, List, Table)
- Assemble pages. Build pages by combining composite components. Use mock data to simulate pages in hard-to-reach states and edge cases. (Home page, Settings page, Profile page)
- Integrate pages into your project. Add pages to your app by connecting data and hooking up business logic. This is when your UI meets your backend APIs and services. (Web app, Marketing site, Docs site)


## Benefits

- Quality: Verify that UIs work in different scenarios by building components in isolation and defining their relevant states.
- Durability: Pinpoint bugs down to the detail by testing at the component level. It’s less work and more precise than testing screens.
- Speed: Assemble UIs faster by reusing existing components from a component library or design system.
- Efficiency: Parallelize development and design by decomposing UI into discrete components then sharing the load between different team members.


## What UIs are not Component Driven?

- **Page-based**: Development and design processes that treats a website as a collection of pages. Not much effort is made to reuse common elements across pages.
- **Tools designed for pages**: Tools that focus on displaying documents like Wordpress and Drupal. Backend frameworks such as Rails, Django and PHP that treat UI reuse as an afterthought and discourage widespread component reuse.