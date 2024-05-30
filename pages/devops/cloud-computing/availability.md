# Availability

## What Is Availability?

The availability of a system is typically expressed as a percentage of uptime in a given year or as a number of nines.

Below, you can see a list of the percentages of availability based on the downtime per year, as well as its notation in nines.

| Availability (%)                  | Downtime (per year) |
|-----------------------------------|---------------------|
| 90% ("one nine")                  | 36.53 days          |
| 99% ("two nines")                 | 3.65 days           |
| 99.9% ("three nines")             | 8.77 hours          |
| 99.95% ("three and a half nines") | 4.38 hours          |
| 99.99% ("four nines")             | 52.60 minutes       |
| 99.995% ("four and a half nines") | 26.30 minutes       |
| 99.999% ("five nines")            | 5.26 minutes        |

To increase availability, you need redundancy. This typically means more infrastructure: more data centers, more servers, more databases, and more replication of data.

## Improve Application Availability

- Use a Second Availability Zone: deploying a second app instance in a different AZ.
- Create a Process for Replication: replicate the configuration files, software patches, and application itself across instances
- Address Customer Redirection: let the clients know about the different servers. An option is to use a load balancer which takes care of health checks and distributing the load across each server.


## Types of High Availability

- **Active-Passive**: only one of the two instances is available at a time. This works great for stateful applications.
- **Active-Active**: by having both servers available, the second server can take some load for the application, thus allowing the entire system to take more load. Stateless applications work better for active-active systems.