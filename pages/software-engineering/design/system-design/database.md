# Database

## Components

Databases have 5 components: interface (API), query processor, metadata, indexes, and storage.

- API: Each database defines a language or API to interact with it. It covers definition, manipulation, query, and control of data and transactions.
- Query Processor: Its job is to process incoming requests, perform needed actions, and return results.
- Storage: The disk or memory where the data is stored.
- Indexes: Data structures to quickly locate the queried data in the storage.
- Metadata: Meta-information of data, storage. and indexes (e.g., catalog, schema, size).

![](https://www.ml4devs.com/images/illustrations/database-components.webp)

### Query Processor

The Query Processor performs the following steps for each incoming request:
- Parses the request and validates it against the metadata.
- Creates an efficient execution plan that exploits the indexes.
- Reads or updates the storage.
- Updates metadata and indexes.
- Computes and returns results.


## Blob Storage

Blob Storage (Binary Large OBjects) is used to store unstructured data.

Blob supports CRUD (create, read, update, delete) operations at the file level.

The directory or file path is the index. You can quickly locate and read the file. Locating something within a file requires a sequential scan. 

Documents, images, audio, and video files are stored in blobs.
