# Micro Frontends

## Frontend Monolith

The current trend is to build a feature-rich and powerful browser application, aka single page app, which sits on top of a micro service architecture. Over time the frontend layer, often developed by a separate team, grows and gets more difficult to maintain.


## Micro Frontends

The idea behind Micro Frontends is to think about a website or web app as a **composition of features** which are owned by **independent teams**. Each team has a distinct area of **business or mission** it cares about and specialises in. A team is **cross functional** and develops its features **end-to-end**, from database to user interface.

![](https://micro-frontends.org/ressources/diagrams/organisational/monolith-frontback-microservices.png)

![](https://micro-frontends.org/ressources/diagrams/organisational/verticals-headline.png)


## Core Ideas behind Micro Frontends

- **Technology Agnostic**. Each team should be able to choose and upgrade their stack without having to coordinate with other teams.
- **Isolate Team Code**. Build independent apps that are self contained. Don't rely on shared state or global variables.
- **Favor Native Browser Features over Custom APIs**. Use Browser Events for communication instead of building a global PubSub system. If you really have to build a cross team API, try keeping it as simple as possible.
- **Build a Resilient Site**. Your feature should be useful, even if JavaScript failed or hasn’t executed yet. Use Universal Rendering and Progressive Enhancement to improve perceived performance.
- **Establish Team Prefixes**. Agree on naming conventions where isolation is not possible yet. Namespace CSS, Events, Local Storage and Cookies to avoid collisions and clarify ownership.


## Cons of Micro-frontend

- Duplication of dependencies => increase payload size
- App performance
- Learning curve
- Only suitable for medium, large projects


## Implementation

### Packages (build-time integration)

Publish each micro frontend as a package and have the container application include them all as library dependencies.

```json
{
  "name": "@shop/container",
  "version": "1.0.0",
  "description": "E-commercial website",
  "dependencies": {
    "@shop/products": "^1.0.0",
    "@shop/order": "^1.0.0",
    "@shop/user-profile": "^1.0.0"
  }
}
```

Cons:

- Not **Technology Agnostic**
- Have to re-compile and release every single micro frontend in order to release a change to any individual part of the product.


### Iframes (run-time integration)

Use iframe to connect other micro frontends.

```html
<html>
  <head>
    <title>Shop</title>
  </head>
  <body>
    <h1>Welcome to Shop</h1>

    <iframe id="app-container"></iframe>

    <script type="text/javascript">
      const microFrontendsByRoute = {
        '/': 'https://products.shop.com/index.html',
        '/order': 'https://order.shop.com/index.html',
        '/user-profile': 'https://profile.shop.com/index.html',
      }

      const iframe = document.getElementById('app-container')
      iframe.src = microFrontendsByRoute[window.location.pathname]
    </script>
  </body>
</html>
```

Cons:

- Difficult to make page responsive
- Difficult to integrate between different parts of application, make routing, history, and deep-linking more complicated

### JavaScript (run-time integration)

Each micro frontend is included onto the page using a `<script>` tag, and upon load exposes a global function as its entry-point. 

The container application then determines which micro frontend should be mounted, and calls the relevant function to tell a micro frontend when and where to render itself.

```html
<html>
  <head>
    <title>Shop</title>
  </head>
  <body>
    <h1>Welcome to Shop</h1>

    <!-- These scripts don't render anything immediately -->
    <!-- Instead they attach entry-point functions to `window` -->
    <script src="https://products.shop.com/bundle.js"></script>
    <script src="https://order.shop.com/bundle.js"></script>
    <script src="https://profile.shop.com/bundle.js"></script>

    <div id="app"></div>

    <script type="text/javascript">
      // These global functions are attached to window by the above scripts
      const microFrontendsByRoute = {
        '/': window.renderProducts,
        '/order': window.renderOrder,
        '/user-profile': window.renderUserProfile,
      }
      const renderFunction = microFrontendsByRoute[window.location.pathname]

      // Having determined the entry-point function, we now call it,
      // giving it the ID of the element where it should render itself
      renderFunction('app')
    </script>
  </body>
</html>
```

### Web Components (run-time integration)

Define each micro frontend as an HTML custom element for the container to instantiate.

```html
<html>
  <head>
    <title>Shop</title>
  </head>
  <body>
    <h1>Welcome to Shop</h1>

    <!-- These scripts don't render anything immediately -->
    <!-- Instead they each define a custom element type -->
    <script src="https://products.shop.com/bundle.js"></script>
    <script src="https://order.shop.com/bundle.js"></script>
    <script src="https://profile.shop.com/bundle.js"></script>

    <div id="app"></div>

    <script type="text/javascript">
      // These element types are defined by the above scripts
      const webComponentsByRoute = {
        '/': 'micro-frontend-products',
        '/order': 'micro-frontend-order',
        '/user-profile': 'micro-frontend-user-profile',
      }
      const webComponentType = webComponentsByRoute[window.location.pathname]

      // Having determined the right web component custom element type,
      // we now create an instance of it and attach it to the document
      const root = document.getElementById('app')
      const webComponent = document.createElement(webComponentType)
      root.appendChild(webComponent)
    </script>
  </body>
</html>
```

Cons:

- Don't support server-side rendering
- No 100% browser support

## Cross-application communication

- [Custom event](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)
- Routing

## Serverside Rendering

Use [Server Side Includes](https://en.wikipedia.org/wiki/Server_Side_Includes) to plug in page-specific content from fragment HTML files

## Reference

- https://micro-frontends.org/
- https://martinfowler.com/articles/micro-frontends.html
- https://www.tomsoderlund.com/programming/micro-frontends-a-microservice-approach-to-front-end-web-development
- https://github.com/ChristianUlbrich/awesome-microfrontends