# Route 53 Resolver

Route 53 Resolver is a set of features that enable bi-directional querying between on-premises and AWS over private connections.

Used for enabling DNS resolution for hybrid clouds.

Route 53 Resolver Endpoints:
- Inbound query capability is provided by Route 53 Resolver Endpoints, allowing DNS queries that originate on-premises to resolve AWS hosted domains.
- Connectivity needs to be established between your on-premises DNS infrastructure and AWS through a Direct Connect (DX) or a Virtual Private Network (VPN).
- Endpoints are configured through IP address assignment in each subnet for which you would like to provide a resolver.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-route-53-resolver-inbound-endpoints.jpeg)

Conditional forwarding rules:

- Outbound DNS queries are enabled using Conditional Forwarding Rules. .
- Domains hosted within your on-premises DNS infrastructure can be configured as forwarding rules in Route 53 Resolver.
- Rules will trigger when a query is made to one of those domains and will attempt to forward DNS requests to your DNS servers that were configured along with the rules.
- Like the inbound queries, this requires a private connection over DX or VPN.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-route-53-resolver-outbound-endpoints.jpeg)


There are a couple of ways to provide resolution of Microsoft Active Directory Domain Controller DNS zones and AWS records:
- Define an outbound Amazon Route 53 Resolver. Set a conditional forwarding rule for the Active Directory domain to the Active Directory servers. Configure the DNS settings in the VPC DHCP options set to use the AmazonProvidedDNS servers.
- Configure the DHCP options set associated with the VPC to assign the IP addresses of the Domain Controllers as DNS servers. Update the DNS service on the Active Directory servers to forward all non-authoritative queries to the VPC Resolver.
