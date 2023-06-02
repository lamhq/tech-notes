# Cypress Cheat Sheet

## Selection commands

- `cy.get`: select based on HTML tag attrs
- `cy.con​tains`: select based value within opening and closing tags
- `.first`: select first matching element
- `.last`: select last matching element
- `.next`: select next matching element
- `.prev`: select previous matching element
- `.parents`: select parent of element
- `.children`: select child of element
- `.siblings`: select sibling of element
- `.closest`: find closest element
- `.find`: find matching child element


## Action Commands

- `.click`: click on an element
- `.dblclick`: double click on an element
- `.right​click`: right click on an element
- `.type(​"​foo​bar​")`: type "​foo​bar​" into an element
- `.clear`: clear all text from an element
- `.check`: check a checkbox or radio
- `.uncheck`: uncheck a checkbox or radio
- `.focus`: focus on an element
- `.blur`: blur an element
- `.submit`: submit a form.
- `.trigg​er(​''c​lic​k")`: trigger any DOM event
- `.hover`: hover over an element (docs)
- `.select`: select option from a dropdown menu


## Assertions (`.should`)

### DOM

- 'have.attr'
- 'have.prop'
- 'have.class'
- 'have.data'
- 'have.id'
- 'have.html'
- 'have.text'
- 'have.value'
- 'have.css'
- 'have.focus'
- 'be.visible'
- 'be.hidden'
- 'be.checked'
- 'be.selected'
- 'be.enabled'
- 'be.disabled'
- 'be.empty'
- 'exist'
- 'contain'
- 'have.descendants'

### Others

- 'be.a': `.should('be.a', 'string')`
- 'be.instanceOf'
- 'be.true'
- 'be.false'
- 'be.null'
- 'be.undefined'
- 'equal'
- 'not.equal': `.should('not.equal', 'Jane')`
- 'deep.equal': `.should('deep.equal', { name: 'Jane' })`
- 'include': `.should('include', 2)`
- 'include.members'
- 'to.match': `.should('to.match', /^test/)`
- 'be.oneOf'
- 'have.property'
- 'have.nested.property'
- 'have.any.keys'
- 'have.keys'
- 'have.all.keys'
- 'have.length'
- 'have.value'


## Browser Commands

- `cy.visit`: visit url
- `cy.go(​"​bac​k")`: click on browser's "​bac​k" button
- `cy.go(​"​for​war​d")`: click on browser's "​for​war​d" button
- `cy.reload`: refresh the page
- `cy.vie​wport`: change window size
- `cy.url`: yields current url
- `cy.window`: yields current window object
- `cy.title`: yields docume​nt.t​itle object
- `.scrol​lIn​toView`: scroll element into view
- `.scrollTo`: scroll to position in the window


## Utility commands

- `cy.log`: log comment to command log
- `cy.fixture`: yield fixture
- `.then(callback)`: work with yielded subject
- `.wait`: wait a certain amount of ms
- `.pause`: stop testing at certain point
- `.scree​nshot`: take a screenshot of state of DOM
- `.debug`: print debug info to the console
