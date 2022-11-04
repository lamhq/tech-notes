# Atomic design pattern

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

![](https://publish-01.obsidian.md/access/5368b88f000f35791077606eecf74f45/_assets/atom-atomic-design.png)


### Molecules

Molecules are a set of atoms combined. 

This could include a form input with a title and input standing next to each other or a header containing multiple atoms like icons, buttons, or inputs.

![](https://publish-01.obsidian.md/access/5368b88f000f35791077606eecf74f45/_assets/molecule-atomic-design.png)


### Organisms

Molecules when joined together create organisms which is a relatively complex and distinct section of an interface.

![](https://publish-01.obsidian.md/access/5368b88f000f35791077606eecf74f45/_assets/organisms-atomic-design.png)


### Templates

Templates consist mostly of groups of organisms to form pages, keep in mind that these template doesn't contain data and only contain props.

In this stage we can really see the design coming together and making more sense for the clients to see the layout of the interface before finalizing it.

![](https://publish-01.obsidian.md/access/5368b88f000f35791077606eecf74f45/_assets/template-atomic-design.png)


### Pages

Pages are specific instances of templates. Here, placeholder content is replaced with real representative content to give an accurate depiction of what a user will ultimately see.

![](https://publish-01.obsidian.md/access/5368b88f000f35791077606eecf74f45/_assets/page-atomic-design.png)


## Source code structure

![](https://publish-01.obsidian.md/access/5368b88f000f35791077606eecf74f45/_assets/folder-structure-atomic-design.png)


## Reference

- [Dwarves Brainery](https://brain.d.foundation/Engineering/Frontend/Atomic+Design+Pattern)
- [bradfrost atomic design](https://bradfrost.com/blog/post/atomic-web-design)
- [Structuring your React Application — Atomic Design Principles](https://andela.com/insights/structuring-your-react-application-atomic-design-principles/)
