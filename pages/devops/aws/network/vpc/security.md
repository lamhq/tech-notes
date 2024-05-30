# Security

## Trafic flow in a VPC

1. Internet Gateway
2. Router
3. Route Table
4. Network ACL
5. Subnet
6. Security Group
7. Instance.

![](https://jayendrapatil.com/wp-content/uploads/2016/03/security-diagram.png)


## Network ACLs (secure subnets)

A network access control list (ACL) is a virtual firewall that controls trafic in and out of subnet.

NACL is the first line of defense.

Network ACLs have separate **inbound and outbound rules**, and each rule can either allow or deny traffic.

Network ACLs contain a numbered list of rules that are evaluated in order **from the lowest number** until the explicit deny.

**Default Network ACLs** allows all outbound and inbound traffic. **Custom network ACLs** deny all inbound and outbound traffic.

**Network ACLs are stateless**. Responses to allowed inbound traffic are subject to the rules for outbound traffic (and vice versa). If you don't include the outbound range, your server would respond but the traffic would never leave the subnet.

You can block IP addresses using network ACLs (not security groups).

All subnets must (and can only) be associated with a network ACL. If you don’t do this manually it will be associated with the default network ACL.

You can associate a network ACL with multiple subnets.

Network ACLs do not filter traffic between instances in the same subnet.

Changes to NACLs take effect immediately.

Example:

**Inbound**:

| Rule # | Source IP | Protocol | Port | Allow/Deny | Comments |
|---|---|---|---|---|---|
| 100 | All  IPv4 traffic | TCP | 443 | ALLOW | Allows  inbound HTTPS traffic from anywhere |
| 130 | 192.0.2.0/24 | TCP | 3389 | ALLOW | Allows  inbound RDP traffic to the web servers from your home network's public IP  address range (over the internet gateway) |
| * | All  IPv4 traffic | All | All | DENY | Denies  all inbound traffic not already handled by a preceding rule (not modifiable) |


**Outbound**:

| Rule # | Destination IP | Protocol | Port | Allow/Deny | Comments |
|---|---|---|---|---|---|
| 120 | 0.0.0.0/0 | TCP | 1025-65535 | ALLOW | Allows  outbound responses to clients on the internet (serving people visiting the  web servers in the subnet) |
| * | 0.0.0.0/0 | All | All | DENY | Denies  all outbound traffic not already handled by a preceding rule (not modifiable) |

*Notice that in the network ACL example above, you allow inbound 443 and outbound range 1025-65535. That's because HTTP uses port 443 to initiate a connection and will respond to an ephemeral port.*


## Security Groups (secure instances)

Security groups act like a firewall at the instance level.

Security groups are the last line of defense.

By default, custom security groups do not have inbound allow rules (all inbound traffic is denied by default).

![](https://sysdig.com/wp-content/uploads/AWS_Security_Groups_Rules_Details.png)

You can only assign permit rules in a security group, cannot assign deny rules (use NACLs instead).

To allow everything, use `0.0.0.0/0`.

All rules are evaluated until a permit is encountered or continues until the implicit deny.

There is an implicit deny rule at the end of the security group.

Security groups are stateful:
- Responses to allowed inbound traffic are allowed to flow out, regardless of outbound rules.
- Outbound and inbound ports may be different

Your VPC includes a default security group. You can't delete this group, however, you can change the group's rules.

You can use security group names as the source or destination in other security groups.

You can use the security group name as a source in its own inbound rules.

Security group can be changed while instances are running. Changes take effect immediately.
