# Schema conversions

## Overview

AWS Glue can perform convert semi-structured schemas to relational schemas.

Conceptually, you are flattening a hierarchical schema to a relational schema.

Semi-structured data can have nested data structures with no fixed schema. 

Relational data is represented by tables that consist of rows and columns. Relationships between tables can be represented by a primary key (PK) to foreign key (FK) relationship.

AWS Glue uses crawlers to infer schemas for semi-structured data. It then transforms the data to a relational schema using an ETL job. 


## Example

![](https://docs.aws.amazon.com/images/glue/latest/dg/images/HowItWorks-schemaconversion.png)

Single value `A` converts directly to a relational column.

The pair of values, `B1` and `B2`, convert to two relational columns.

Structure `C`, with children `X` and `Y`, converts to two relational columns.

Array `D[]` converts to a relational column with a foreign key (FK) that points to another relational table. Along with a primary key (PK), the second relational table has columns that contain the offset and value of the items in the array.