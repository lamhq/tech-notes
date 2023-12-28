# AWS Lake Formation

## Data lake

Data can be scattered in a variety of places, both on AWS and on-premises. This fragmentation can make data difficult to analyze, visualize, or correlate.

A data lake is a centralized database that collects and stores massive amounts of data from any number of places. It allows to search, analyze, visualize, and correlate your data on the fly.


## Overview

AWS Lake Formation lets you create a data lake from all of your data regardless of whether it's stored on AWS or on-premises.

It uses AWS Glue to perform ETL operations and import data.

It can automatically label ingested data. The AWS Glue Data Catalog stores metadata about the data lake, including labels.

It can help deduplicate data in multiple databases.