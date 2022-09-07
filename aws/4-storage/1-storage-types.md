# Storage Types on AWS

## File Storage

You place your files in a tree-like hierarchy that consists of folders and subfolders. 

Each file has metadata such as file name, file size, and the date the file was created. The file also has a path, when you need to retrieve a file, your system can use the path to find it in the file hierarchy.

Common use cases for file storage include:

- Large content repositories
- Development environments
- User home directories


## Block Storage

While file storage treats files as a singular unit, block storage splits files into fixed-size chunks of data called **blocks** that have their own addresses. Since each block is addressable, blocks can be retrieved efficiently.

When data is requested, these addresses are used by the storage system to organize the blocks in the correct order to form a complete file to present back to the requestor.

**When you want to change a character in a file, you just change the block, or the piece of the file, that contains the character.** This ease of access is why block storage solutions are fast and use less bandwidth.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/FqmPgSlkQDqpj4EpZGA6Og_62c9ddf6c845409b8c8a1431e744ba53_StorageTypes_2.jpeg?expiry=1662595200000&hmac=5IJY5TYgUMpGFr8_cANaANmw2ngLA3UZI0RXVGFXmqU)

Since block storage is optimized for low-latency operations, it is a typical storage choice for high-performance enterprise workloads, such as databases or enterprise resource planning (ERP) systems, that require low-latency storage.


## Object Storage

Objects, much like files, are also treated as a single unit of data when stored. However, unlike file storage, these objects are stored in a flat structure instead of a hierarchy. Each object is a file with a unique identifier. This identifier, along with any additional metadata, is bundled with the data and stored.

Changing just one character in an object is more difficult than with block storage. When you want to change one character in a file, the entire file must be updated.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/251kRdAARIqdZEXQAHSKsQ_5d22f3c345834a24aeb382e61ee68da5_StorageTypes_3.jpeg?expiry=1662595200000&hmac=qEbL7mz1za0b3AEHlIG0pcq6b9O6puhAHWBt1CIB2Ps)

With object storage, you can store almost any type of data, and there is no limit to the number of objects stored, making it easy to scale. Object storage is generally useful when storing large data sets, unstructured files like media assets, and static assets, such as photos.