# Security

## Secure Your Subnets with Network ACLs

Think of a network ACL as a firewall at the subnet level. A network ACL enables you to control what kind of traffic is allowed to enter or leave your subnet.

For example, if you have a web application, you might restrict your network to allow HTTPS traffic and remote desktop protocol (RDP) traffic to your web servers.

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

Network ACL's are considered stateless, so you need to include both the inbound and outbound ports used for the protocol. If you don't include the outbound range, your server would respond but the traffic would never leave the subnet.


## Secure Your EC2 Instances with Security Groups

The default configuration of a security group blocks all inbound traffic and allows all outbound traffic.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/LoWSavO8Ss-FkmrzvBrPZg_976ab1cb999648f4bffd70512bd32d27_SG.jpeg?expiry=1662595200000&hmac=UOzeJSU8iN1VuamFjJQSAt1VmE_ea45Aw3RAxB0DR8g)

Security groups are stateful, meaning they will remember if a connection is originally initiated by the EC2 instance or from the outside and temporarily allow traffic to respond without having to modify the inbound rules. 

A common design pattern is organizing your resources into different groups and creating security groups for each to control network communication between them.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/ZnKJspBYSOeyibKQWDjnYQ_6e94f0f1d04e4409a37ce7b5ada5c75b_SG2.jpeg?expiry=1662595200000&hmac=tG-E-_GEGyXf2XIY8YrqeyKVqe5eMp9LrevJEXca2eI)
