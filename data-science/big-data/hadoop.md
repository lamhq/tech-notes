# Apache Hadoop and Big Data

## What is Big Data?

### Volume

"Big" is a relative term. There is no straight number that defines big data. It's all relative, what we consider to be big may not be the case for companies like Google and Facebook.

When we say Big Data, we are potentially talking about hundreds to thousands of Terabytes.

### Velocity

When we think of Big Data. We should look at the rate at which our data grows. In other words, we should watch the velocity or speed of our data growth.

If your data volume stays at 1TB for a year, all we need is a good database. If your growth rate is 1TB/week, then you have to think about a scalable Big Data solution.


### Variety 

This is the factor when we have data coming to our system in different forms and have to process or analyze the data in different formats.

Whenever we are asked whether it is a big data problem or not, please take the 3 factors: **Volume**, **Velocity**, and **Variety** into consideration.

### Example of a non-big data scenario

When our client's data storage that has performance issues they hope that a Big Data solution like Hadoop is going to solve their problem.

Most of the time, their answer will fail in the volume and velocity tests:
- The volume will be in the higher gigabytes or lower gigabytes (the volume does not qualify as big data).
- Their growth rate has been relatively low for the past six months and in the foreseeable future (it fails the velocity test as well)

What the client needs is to optimize the existing process and not a sophisticated Big Data solution.


### Usecases

- Science: NASA gathers about 1.73 GB of data every hour about geolocation data from satellites. Large Hadron Collider at SUN produces about 1TB of data every second, mostly sensor data from their equipment
- Goverment: Obama's 2nd term election campaign used Big Data analytics which gave them a Competitive Edge to actually win the election.
- Private: Amazon is not only capturing data when you click checkout but also every click on their website, which is tracked to bring a personalized shopping experience. When Amazon shows you recommendations, Big Data analytics is at work behind the scenes.


## Big Data Challenges

- Data sets are huge, we need to find a way to store them as efficiently as possible. In terms of **storage space** and **computation** (so we can analyze them)
- Dealing with data loss due to corruption or hardware failure. You need to have a proper recovery strategy in place.
- The solution that you plan to use should be cost-effective since you're going to need a lot of storage space and a lot of computational power.


## Solutions

### RDBMS

Traditional RDBMS will have scalability issues when moving up in data volume in terms of Terabytes. The database is not horizontally scalable, i.e., you cannot add more resources or more computation nodes and hope the execution time or the performance will improve.

Databases are designed to process structured data. When our data does not have a proper structure, the database will struggle. Furthermore, a database is not a good choice when you have a variety of data which is data in several formats like texts, images, videos, etc.

A good enterprise-grade database solution can be quite expensive for a relatively low volume of data when you add hardware costs and platinum-grade storage costs. It's going to be quite expensive.


### Grid Computing - A distributed computation solution

Grid computing is essentially many nodes operating on data parallelly and then doing faster computation. However, there are two challenges:

- Grid or high-performance computing is good for computing-intensive tasks with a relatively low volume of data but does not perform well when the data volume is huge.
- Grid computing requires a good experience with lower-level programming to implement and then it is not suitable for the mainstream.


### Hadoop - A good solution

- It can handle a huge volume of data
- It provide efficient storage
- Have a good recovery strategy
- horizontally scalable
- cost-effective

## Hadoop

### Hadoop vs RDBMS

| Hadoop | RDBMS |
|---|---|
| Hadoop has the volume in terms of petabytes | RDBMS works exceptionally well with volume in low terabytes |
| Hadoop can work with Dynamic Schema and supports files in many different formats | The schema is very strict and not so flexible and cannot handle multiple formats |
| Hadoop solution can scale horizontally | RDBMS's solution can scale vertically, meaning we can add more resources to the existing solution and to make any improvements to the process itself like tuning the queries and adding more indexes, etc. |
| Hadoop offers a cost-effective solution | It gets expensive very quickly when we increase the volume of data |
| Hadoop is a batch processing system, so we cannot expect a millisecond response time like an interactive system | RDBMS is an interactive and batch system |
| We can write the file or data once and then operate or analyze data multiple times | we can read and write multiple times |


### Architecture

What is Hadoop? Hadoop is a framework for distributed processing of large data sets across clusters of commodity computers. Hadoop has two core components, HDFS and MapReduce. 

HDFS stands for Hadoop Distributed File System, and it takes care of all your storage-related complexities like splitting your data set into blocks, replicating each block to more than one node, and also keep track of which block is stored on which node, etc. 

MapReduce is a programming model, and Hadoop implements MapReduce, and it takes care of all the computational complexities. Therefore, Hadoop framework takes care of bringing all the intermediate results from every single node to offer a consolidated output.