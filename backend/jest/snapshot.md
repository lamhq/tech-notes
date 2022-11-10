# Snapshot Testing

```js
// link.spec.js
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

## Updating Snapshots

You can run Jest with a flag that will tell it to re-generate snapshots:

```sh
jest --updateSnapshot
```

Failed snapshots can also be updated interactively in watch mode also:

![https://jestjs.io/img/content/interactiveSnapshot.png](https://jestjs.io/img/content/interactiveSnapshot.png)


## Matching objects instead of components

```js
it('will check the matchers and pass', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };

  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  });
});

// Snapshot
exports[`will check the matchers and pass 1`] = `
Object {
  "createdAt": Any<Date>,
  "id": Any<Number>,
  "name": "LeBron James",
}
`;
```