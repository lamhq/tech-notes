# Atomic Design

Atomic design is a methodology for crafting design systems with five key fundamental building blocks, which, when combined, promote consistency, modularity, and scalability.

## Why using atomic design

- Provide flexible and consistent designs from the beginning.
- Move from abstract to concrete, encourage consistency and scalability.
- The method fits incredibly well with component-based architectures like React, Vue,...

## How does it work? 

There are 5 distinct levels of atomic design which are: atoms, molecules, organisms, templates, and pages.

### Atoms

The basic building blocks. When applied to web interfaces, they are our HTML tags like an `input` or a `button`.

These are fairly abstract elements.

![](https://bradfrost.com/wp-content/uploads/2013/06/atoms.jpg)


### Molecules

Molecules are a set of atoms combined. 

This could include a form input with a title and input standing next to each other or a header containing multiple atoms like icons, buttons, or inputs.

![](https://bradfrost.com/wp-content/uploads/2013/06/molecule.jpg)


### Organisms

Molecules when joined together create organisms which is a relatively complex and distinct section of an interface.

![](https://bradfrost.com/wp-content/uploads/2013/06/organism-examples.jpg)


### Templates

Templates consist mostly of groups of organisms to form pages, keep in mind that these template doesn't contain data and only contain props.

In this stage we can really see the design coming together and making more sense for the clients to see the layout of the interface before finalizing it.

![](https://bradfrost.com/wp-content/uploads/2013/06/template1.jpg)


### Pages

Pages are specific instances of templates. Here, placeholder content is replaced with real representative content to give an accurate depiction of what a user will ultimately see.

![](https://bradfrost.com/wp-content/uploads/2013/06/page1.jpg)


## Reference

- [bradfrost atomic design](https://bradfrost.com/blog/post/atomic-web-design)
- [Best Practices for Organizing Code with Atomic Folder Structure in React Native](https://medium.com/@prathiba2796/react-native-best-practices-for-organizing-code-with-atomic-folder-structure-131858653eb1)
