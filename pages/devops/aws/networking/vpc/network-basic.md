# Networking Basics

## IP Addresses

In order to properly route your messages to a location, you need an address. Just like each home has a mail address, each computer has an IP address.

Here is an example of a 32-bit address in binary format: 

![](./images/ip.png)


## CIDR Notation

`192.168.1.30` is a single IP address. If you wanted to express IP addresses between the range of `192.168.1.0` and `192.168.1.255`, how can you do that?

One way is by using Classless Inter-Domain Routing (CIDR) notation. CIDR notation is a compressed way of specifying a range of IP addresses. Specifying a range determines how many IP addresses are available to you. 

CIDR notation looks like this: 

![](./images/cidr.png)

It begins with a starting IP address and is separated by a forward slash (the "/" character) followed by a number. The number at the end specifies how many of the bits of the IP address are fixed. In this example, the first 24 bits of the IP address are fixed. The rest are flexible.

In AWS, the smallest IP range you can have is `/28`, which provides you **16** IP addresses. 

The largest IP range you can have is a `/16`, which provides you with **65,536** IP addresses.

- `10.0.0.0/16` -> 65,536 possible addresses (`10.0.0.0` - `10.0.255.255`)
- `10.0.0.0/28` -> 16 possible addresses (`10.0.0.0` - `10.0.0.15`)

You can use [CIDR.xyz](cidr.xyz) to calculate IP address ranges.


## Private IP address ranges

Private IP addresses are used within a private network and are not routable on the public internet.

The RFC 1918 document specifies the IP address ranges that can be used for private networks. 

The IP addresses within this range are reserved for private networks and should not be used on the public internet:

- `10.0.0.0` – `10.255.255.255` (10/8 prefix, the first 8 bits of the IP address are fixed and the remaining 24 bits can be used for addressing hosts within the private network)
- `172.16.0.0` – `172.31.255.255` (172.16/12 prefix)
- `192.168.0.0` – `192.168.255.255` (192.168/16 prefix)
