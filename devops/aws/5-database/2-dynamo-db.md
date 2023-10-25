# Amazon DynamoDB

## What Is Amazon DynamoDB?

Amazon DynamoDB is a key-value database service.

- **Serverless**: DynamoDB is serverless, which means that you do not have to provision, patch, manage servers, install, maintain, or operate software.. 
- **Automatic Scaling**: As the size of your database shrinks or grows, DynamoDB automatically scales to adjust for changes in capacity while maintaining consistent performance. 

All of your data is stored on solid-state disks (SSDs) and is automatically replicated across multiple Availability Zones in an AWS Region, providing built-in high availability and data durability. 


## Core Components

A table is a collection of items. Each table contains zero or more items. An item is a group of attributes that is uniquely identifiable among all of the other items. An attribute is a fundamental data element, something that does not need to be broken down any further. 

*For example, a table called People that you could use to store personal contact information about friends, family, or anyone else of interest. In a People table, each item represents a person. An item in a People table contains attributes called PersonID, LastName, FirstName, and so on.*
