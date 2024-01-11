# DNS Concepts

## DNS resolution

DNS resolution is the process of translating a domain name to an IP address. 

![](./images/dns.png)


## Top-level domains

The last word in a domain name represents the top-level domain.

The second word in a domain name is known as a second-level domain name (this is optional, though, and depends on the domain name).

Example: `.co.uk`, `.co` is the second level, the top level is `.uk`.

Top-level domain names are controlled by the Internet Assigned Numbers Authority (IANA) in a root [zone database](http://www.iana.org/domains/root/db), a database of all available top-level domains.


## Naked domains

A naked domain is a domain name that does not include a subdomain such as `www`. For example, if your website is hosted at `example.com`, then `example.com` is the naked domain.

Naked domains are often used for the root domain of a website, while subdomains are used for specific pages or sections of the website


## Domain Registrars

A registrar is an authority that can assign domain names directly under one or more top-level domains.

These domains are registered with InterNIC, a service of ICANN, which enforces uniqueness of domain names across the internet.

Each domain name becomes registered in a central database known as the WHOIS database.


## DNS Record Types

DNS records are stored in zone files on DNS servers.

### SOA records

It stores information about a domain or zone:

- The name of the server that supplied the data for the zone
- The administrator of the zone
- The current version of the data file
- The default number of seconds for the time-to-live file on resource records

### NS records

NS records are used by top-level domain servers to direct traffic to the content DNS server that contains the authoritative DNS records.

In other words, the NS records **indicate which DNS server is authoritative for a domain** and contains the actual DNS records. The authoritative DNS server is responsible for providing the IP address of the domain name to the requesting client.

![](./images/soa.png)

### A records

You use an A record to route traffic to a resource, such as a web server, using an IPv4 address in dotted decimal notation.

For example, http://www.acloud.guru might point to http://123.10.10.80.


### AAAA record type

You use an AAAA record to route traffic to a resource, such as a web server, using an **IPv6 address** in colon-separated hexadecimal format.

Example value: `2001:0db8:85a3:0:0:8a2e:0370:7334`


### CNAME records

A CNAME (canonical name) can be used to resolve one domain name to another.

Cannot be used for naked domain names (zone apex record). You can't have a CNAME for http://acloudguru.com

You can't create a CNAME record at the zone apex


### Alias records 

Allow you to route traffic to selected AWS resources, such as CloudFront distributions and Amazon S3 buckets that are configured as websites.

Alias records are useful when you want to route traffic to an AWS resource, such as an Elastic Load Balancing load balancer, that doesn’t have a fixed IP address.

Alias records only exists within the AWS ecosystem. It's not a type of DNS record.

Can be used for a naked domain name/ zone apex record.


## Time to live (TTL)

TTL is the length that a DNS record is cached.

The lower the time to live, the faster changes to DNS records take to propagate throughout the internet.
