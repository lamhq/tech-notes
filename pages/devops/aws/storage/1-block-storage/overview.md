# Overview

## Block Storage

While file storage treats files as a singular unit, block storage splits files into fixed-size chunks of data called **blocks** that have their own addresses. Since each block is addressable, blocks can be retrieved efficiently.

When data is requested, these addresses are used by the storage system to organize the blocks in the correct order to form a complete file to present back to the requestor.

**When you want to change a character in a file, you just change the block, or the piece of the file, that contains the character.** This ease of access is why block storage solutions are fast and use less bandwidth.

![](./images/block-storage.png)

Since block storage is optimized for low-latency operations, it is a typical storage choice for high-performance enterprise workloads, such as databases or enterprise resource planning (ERP) systems, that require low-latency storage.


## IOPS and Throughput

### IOPS

- Measures the number of read and write operations per second.
- Important metric for quick transactions, low-latency apps, transactional workloads.
- The ability to action reads and writes very quickly.

The speed of your database storage is limited by the number of IOPS allocated to it.

To understand how many IOPS you need, you first need to know the amount of data you can transfer in a single I/O operation (disk throughput). For example:
- MySQL and MariaDB have a page size of 16 KB. Hence, writing 16 KB of data to disk would constitute one I/O operation
- Oracle, PostgreSQL, and Microsoft SQL Server use a page size of 8 KB. Writing 16 KB of data using one of those database engines would consume two I/O operations.

### Throughput

- Measures the number of bits read or written per second (MB/s)
- Important metric for big data, data warehousing, ETL, large I/O sizes, complex queries
- The ability to deal with large datasets
