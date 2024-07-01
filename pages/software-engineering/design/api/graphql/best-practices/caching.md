# Caching

API servers need a globally unique identifier that the client can leverage to build a cache.

## Globally Unique IDs

One possible pattern for this is reserving a field, like `id`, to be a globally unique identifier.

If the backend uses something like UUIDs for identifiers, then exposing this globally unique ID may be very straightforward.

If the backend doesn't have a globally unique ID for every object already, the GraphQL layer might have to construct this. Oftentimes, that's as simple as appending the name of the type to the ID and using that as the identifier; the server might then make that ID opaque by base64-encoding it.


## Compatibility with existing APIs

if our existing API accepted a type-specific ID, but our GraphQL API uses globally unique IDs, then using both at once can be tricky.

In these cases, the GraphQL API can expose the previous API's IDs in a separate field. This gives us the best of both worlds:

- GraphQL clients can continue to rely on a consistent mechanism for getting a globally unique ID.
- Clients that need to work with our previous API can also fetch `previousApiId` from the object, and use that.
