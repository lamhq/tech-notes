## References
- https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/in-depth/record-specifications/#accepted-datatypes-for-your-attributes
- https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/in-depth/record-specifications/#dates
- https://www.algolia.com/doc/guides/sending-and-managing-data/manage-your-indices/
- https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute/#using-the-api
- https://www.algolia.com/doc/guides/managing-results/refine-results/grouping/


## Initialize Algolia
```js
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables
const algoliasearch = require('algoliasearch/lite');
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
```


## Perform an Algolia search

```js
// https://www.algolia.com/doc/api-reference/api-methods/search/
var index = client.initIndex('notes');
index.setSettings({
  searchableAttributes: [
    'title,alternative_title',
    'author',
    'unordered(text)'
  ],
  attributesForFaceting: [
    'brand' // or 'filterOnly(brand)' for filtering purposes only
  ],
  ranking: [
    "desc(price)",
  ]
});

index
  .search({
    query,
    page: 1,
    attributesToRetrieve: ['firstname', 'lastname'],
    filters: '(category:Book OR category:Ebook) AND brand:Motorola',
    hitsPerPage: 50,
  })
  .then(function(responses) {
    // Response from Algolia:
    // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
    const { page, nbPages, }
    console.log(responses.hits);
  });
```


## Sync data with firestore using cloud function
```js
// Update the search index every time a report record is written or removed
exports.onReportChange = functions.firestore
  .document('reports/{reportId}')
  .onWrite(async (change, context) => {
    const { reportId } = context.params;
    if (change.after.exists) {
      const report = change.after.data();
      const data = {
        objectID: reportId,
        ...report,
      };
      // console.log(`report ${reportId} saved. data: ${JSON.stringify(data)}`);
      await index.saveObject(data);
    } else {
      // console.log(`report ${reportId} removed.`);
      await index.deleteObject(reportId);
    }
  });
```