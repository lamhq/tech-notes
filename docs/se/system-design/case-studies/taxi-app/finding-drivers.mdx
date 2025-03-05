# Finding Drivers

## How It Works

When customers open the app, they should see nearby drivers.

The app updates driver locations every 5 seconds to match the rate at which drivers update their own locations.

Additionally, we display 10 drivers to each user.


## Communication

We need to support two actions:
- Retrieving nearby drivers
- Booking a driver

REST is an excellent choice for this, as it facilitates external interactions from the mobile app.


## Throughput

Each time a customer opens the app, they use it for approximately 1 minute. The app refreshes every 5 seconds.
- Requests per customer per minute = 60 / 5 = 12

Each customer opens the app 5 times a day.
- Requests per customer per day = 12 x 5 = 60

There're 10M active customers.
- Requests per day = 10M * 60 = 600M
- Requests per hour = 600M / 24 = 25M
- Requests per minute = 25M / 60 = 400K
- Requests per second = 400K / 60 = ~7K


## Query nearby drivers

The Driver Location service leverages the Shard Locator service to determine the correct shard for the customer's region and filter nearby drivers.

Options for querying nearby drivers:
1. Perform a geospatial search in the database.
2. Create an in-memory geospatial index.


### Geospatial Search in Database

To locate the nearest drivers to a customer, it's best to use a database that supports geospatial queries.

Databases like MongoDB, PostgreSQL, and MySQL offer this capability.


### In-Memory Geospatial Index

While we keep storing locations in the main database, we also create and manage a geospatial index in memory (using a KD-tree, for example).

We then query this index instead of the actual database.

Pros:
- Independence from a specific database technology.

Cons:
- Delay when syncing the index with the main database.
- Need to manage the number of indexers carefully due to the high cost of indexing operations.