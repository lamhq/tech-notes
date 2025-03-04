# Snapshot Testing

Snapshots are a fantastic tool for identifying unexpected interface changes within your application – whether that interface is an API response, UI, logs, or error messages.

A typical snapshot test case renders a UI component, takes a snapshot, then compares it to a reference snapshot file stored alongside the test. The test will fail if the two snapshots do not match: either the **change is unexpected**, or **the reference snapshot needs to be updated** to the new version of the UI component.


## Create snapshot test

To test your React components, you can use a test renderer to quickly generate a serializable value for your React tree:

```js
import renderer from 'react-test-renderer';
import Link from '../Link';

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

The first time this test is run, Jest creates a snapshot file that looks like this:

```js
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>
`;
```

The snapshot artifact should be committed alongside code changes, and reviewed as part of your code review process.

On subsequent test runs, Jest will compare the rendered output with the previous snapshot. If they match, the test will pass. If they don't match, either the test runner found a bug in your code (in the `<Link>` component in this case) that should be fixed, or the implementation has changed and the snapshot needs to be updated.


## Updating Snapshots

You can run Jest with a flag that will tell it to re-generate snapshots:

```sh
jest --updateSnapshot
```


## Interactive Snapshot Mode

Failed snapshots can also be updated interactively in watch mode:

![https://jestjs.io/img/content/interactiveSnapshot.png](https://jestjs.io/img/content/interactiveSnapshot.png)


## Inline Snapshots

Inline snapshots behave identically to external snapshots (`.snap` files), except the snapshot values are written automatically back into the source code.

First, you write a test, calling `.toMatchInlineSnapshot()` with no arguments:

```js
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="https://example.com">Example Site</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot();
});
```

The next time you run Jest, `tree` will be evaluated, and a snapshot will be written as an argument to `toMatchInlineSnapshot`:

```js
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="https://example.com">Example Site</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
<a
  className="normal"
  href="https://example.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Example Site
</a>
`);
});
```

You can even update the snapshots with `--updateSnapshot` or using the u key in `--watch` mode.


## Property Matchers

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