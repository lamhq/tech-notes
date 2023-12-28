# Security

## Trafic flow in a VPC

**Internet Gateway** > **Router** > **Route Table** > **Network ACL** > **Subnet** > **Security Group** > **Instance**.

![](https://jayendrapatil.com/wp-content/uploads/2016/03/security-diagram.png)


## Network ACLs (secure subnets)

Before a packet can enter into a subnet or exit from a subnet, it is checked for permissions by network access control list (ACL).

A network access control list (ACL) is a virtual firewall that controls trafic in and out of subnet.

Network ACLs have separate **inbound and outbound rules**, and each rule can either allow or deny traffic.

NACL rules are evaluated by rule number from **lowest to highest** and executed immediately when a matching rule is found.

**Default Network ACLs** allows all outbound and inbound traffic. **Custom network ACLs** deny all inbound and outbound traffic.

**Network ACLs are stateless**. Responses to allowed inbound traffic are subject to the rules for outbound traffic (and vice versa). If you don't include the outbound range, your server would respond but the traffic would never leave the subnet.

You can block IP addresses using network ACLs (not security groups).

You can associate a network ACL with multiple subnets. Each subnet can and must be associated with only 1 network ACL. When you associate a network ACL with a subnet, the previous association is removed.

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

Security group are virtual firewalls for a particular entity, such as an EC2 instance.

By default, all inbound traffic are blocked, all outbound traffic are allowed. To allow everything, use `0.0.0.0/0`.

Security groups are the last line of defense.

![](https://sysdig.com/wp-content/uploads/AWS_Security_Groups_Rules_Details.png)

Security groups are stateful: Responses to allowed inbound traffic are allowed to flow out, regardless of outbound rules.

Your VPC includes a default security group. You can't delete this group, however, you can change the group's rules.

An Amazon EC2 instance can be associated with up to 5 security groups.


### Security group pattern

A common design pattern is organizing your resources into different groups and creating security groups for each to control network communication between them.

![](./images/layer-sg.png)
