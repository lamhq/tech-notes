# Final Design

We designed a system capable of scaling to support 10 million customers and 500,000 drivers concurrently.

Each driver maintains a persistent connection to our gateway using WebSockets.

Driver locations are received and stored in a sharded database.

To expedite the matching process (finding the best driver for a customer), we create a geospatial index in memory from the database.

![](./final-design.drawio.svg)
