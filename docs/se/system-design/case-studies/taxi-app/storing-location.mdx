# Storing Locations

## Scaling for Write Operations

To scale the database to handle 50K inserts per second, we need some kind of sharding.

We need to divide our storage into at least 10 shards, ensuring each shard holds an approximately equal amount of data.


## Sharding: By Country

We assume each driver operates exclusively within a single country, and we have information on all drivers and their respective countries.

When a driver sends their location data, we select the shard corresponding to their country and store the location data there.

**Pros:**
- Straightforward and easy to implement.

**Cons:**
- If the majority of drivers are concentrated in one country, that shard will become a hotspot, receiving most of the requests.


## Sharding: By Custom Areas

We divide the world into distinct areas.

To map a position to an area, we need a highly scalable locator service.

The locator service receives drivers' coordinates, identifies the appropriate area, and assigns them to the correct shard.

**Cons:**
- Maintaining the list of areas and ensuring they have a balanced number of drivers
- Develop the mapping positions logic is complicated
- Increased system complexity

![](./custom-areas.drawio.svg)


## Sharding: Geospatial Library

We divide the world into distinct shapes using a geospatial library, such as Uber's H3 or Google's S2.

H3 partitions the world into hexagonal cells with the same size which minimize distortion and quantization error, making them ideal for spatial analysis.

**Pros:**
- No need to maintain a list of areas
