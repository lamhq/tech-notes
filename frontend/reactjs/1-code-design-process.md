# Code Design Process 

aka: *Thinking in React*

## Start with the mockup

<img src="https://react.dev/images/docs/s_thinking-in-react_ui.png" width="350">


## 1: Break the UI into a component hierarchy

One technique is the single responsibility principle, that is, a component should ideally only do one thing.

<img src="https://react.dev/images/docs/s_thinking-in-react_ui_outline.png" width="500">

- `FilterableProductTable` (grey) contains the entire app.
- `SearchBar` (blue) receives the user input.
- `ProductTable` (lavender) displays and filters the list according to the user input.
- `ProductCategoryRow` (green) displays a heading for each category.
- `ProductRow` (yellow) displays a row for each product.

Now that you’ve identified the components in the mockup, arrange them into a hierarchy:

- `FilterableProductTable`
  - `SearchBar`
  - `ProductTable`
    - `ProductCategoryRow`
    - `ProductRow`


## 2: Build a static version in React

Build a version that renders the UI from your data model without adding any interactivity

Don’t use state at all to build this static version. State is reserved only for interactivity, that is, data that changes over time.

You can either build “**top down**” by starting with building the components higher up in the hierarchy (like `FilterableProductTable`) or “**bottom up**” by working from components lower down (like `ProductRow`). In simpler examples, it’s usually easier to go top-down, and on larger projects, it’s easier to go bottom-up.

```js
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```


## 3: Find the minimal but complete representation of UI state

Figure out the absolute minimal representation of the state your application needs and compute everything else on-demand.

*For example, if you’re building a shopping list, you can store the items as an array in state. If you want to also display the number of items in the list, don’t store the number of items as another state value—instead, read the length of your array.*

Think of all of the pieces of data in the application:

- Does it **remain unchanged** over time? If so, it isn’t state.
- Is it **passed in from a parent** via props? If so, it isn’t state.
- **Can you compute it** based on existing state or props in your component? If so, it definitely isn’t state!

Let’s go through data in the example application:

- The **original list of products** is passed in as props, so it’s not state.
- The **search text** seems to be state since it changes over time and can’t be computed from anything.
- The **value of the checkbox** seems to be state since it changes over time and can’t be computed from anything.
- The **filtered list of products** isn’t state because it can be computed by taking the original list of products and filtering it according to the search text and value of the checkbox.


## 4: Identify where your state should live 

After identifying your app’s minimal state data, you need to identify which component is responsible for changing this state, or owns the state.

For each piece of state in your application:

1. Identify every component that renders something based on that state.
1. Find their closest common parent component—a component above them all in the hierarchy.
1. Decide where the state should live:
    1. Often, you can put the state directly into their common parent.
    1. You can also put the state into some component above their common parent.
    1. If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common parent component.


In the previous step, you found two pieces of state in this application: the **search input text**, and the **value of the checkbox**. In this example, they always appear together, so it makes sense to put them into the same place.

Now let’s run through our strategy for them:

1. Identify components that use state:
    - `ProductTable` needs to filter the product list based on that state (search text and checkbox value).
    - `SearchBar` needs to display that state (search text and checkbox value).
1. Find their common parent: The first parent component both components share is `FilterableProductTable`.
1. Decide where the state lives: We’ll keep the filter text and checked state values in `FilterableProductTable`.

Add two state variables at the top of `FilterableProductTable` and specify their initial state:

```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
```

Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as props:

```jsx
<div>
  <SearchBar 
    filterText={filterText} 
    inStockOnly={inStockOnly} />
  <ProductTable 
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly} />
</div>
```


## 5: Add inverse data flow

To change the state according to user input, you will need to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

To let `SearchBar` update the `FilterableProductTable’s` state, you need to pass functions `setFilterText` and `setInStockOnly` down to `SearchBar`:

```jsx
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

Inside the `SearchBar`, you will add the `onChange` event handlers and set the parent state from them:

```jsx
<input 
  type="text" 
  value={filterText} 
  placeholder="Search..." 
  onChange={(e) => onFilterTextChange(e.target.value)} />
```