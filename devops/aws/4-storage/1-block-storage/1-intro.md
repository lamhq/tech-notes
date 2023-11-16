# Block Storage

## Overview

While file storage treats files as a singular unit, block storage splits files into fixed-size chunks of data called **blocks** that have their own addresses. Since each block is addressable, blocks can be retrieved efficiently.

When data is requested, these addresses are used by the storage system to organize the blocks in the correct order to form a complete file to present back to the requestor.

**When you want to change a character in a file, you just change the block, or the piece of the file, that contains the character.** This ease of access is why block storage solutions are fast and use less bandwidth.

![](images/block-storage.png)

Since block storage is optimized for low-latency operations, it is a typical storage choice for high-performance enterprise workloads, such as databases or enterprise resource planning (ERP) systems, that require low-latency storage.


## Amazon EC2 Instance Store

Block-level storage volumes behave like physical hard drives.

An instance store provides temporary block-level storage for an Amazon EC2 instance. When the instance is terminated, you lose any data in the instance store.

It's ideal for temporary storage of information that changes frequently, such as buffers, caches, scratch data, and other temporary content.
