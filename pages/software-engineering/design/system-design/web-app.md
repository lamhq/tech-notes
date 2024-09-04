# Design Architecture for a Web application

## Overview

Designing a system that supports millions of users.

In this topic, we build a system that supports a single user and gradually scale it up to serve millions of users.


## Single Server

Start with a single server setup where everything is running on one server: web app, database, cache, etc.

The traffic to the server comes from two sources: web browser and mobile application:
- Web browser: sending HTTP requests (GET, POST, etc.) to the server. The server processing these requests and send back HTML content
- Mobile application: communicate with servers using APIs. JSON is a lightweight data format commonly used for API communication.

<!-- scaling-web-app.drawio\single server -->
<iframe frameborder="0" style="width:100%;height:357px;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=https%3A%2F%2Fapp.diagrams.net%2F%23G1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%23%257B%2522pageId%2522%253A%2522QPsRIN0huZrPv1nBiWiu%2522%257D&layers=1&nav=1&title=scaling-web-app.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%26export%3Ddownload"></iframe>


## Separated Database Server

With the growth of the user base, we need multiple servers: one for web/mobile traffic, the other for the database.

Separating web/mobile traffic (web tier) and database (data tier) servers allows them to be scaled independently.

<!-- scaling-web-app.drawio\database -->
<iframe frameborder="0" style="width:100%;height:543px;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=https%3A%2F%2Fapp.diagrams.net%2F%23G1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%23%257B%2522pageId%2522%253A%2522z6L2SULGltuUVYjcrTCg%2522%257D&layers=1&nav=1&title=scaling-web-app.drawio&page-id=z6L2SULGltuUVYjcrTCg#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%26export%3Ddownload"></iframe>


## Scaling the web app

With the web app running on a single server:
- Users are connected to the web server directly. Users will unable to access the website if the web server is offline.
- If many users access the web server simultaneously and it reaches the web server’s load limit, users generally experience slower response or fail to connect to the server.

A load balancer is the best technique to address these problems.

After a load balancer and a second web server are added, we successfully solved no failover issue and improved the availability of the web tier:
- If server 1 goes offline, all the traffic will be routed to server 2. This prevents the website from going offline. We will also add a new healthy web server to the server pool to balance the load.
- If the website traffic grows rapidly, and two servers are not enough to handle the traffic, the load balancer can handle this problem gracefully. You only need to add more servers to the web server pool, and the load balancer automatically starts to send requests to them.

<!-- scaling-web-app.drawio\scaling web app -->
<iframe frameborder="0" style="width:100%;height:659px;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=https%3A%2F%2Fapp.diagrams.net%2F%23G1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%23%257B%2522pageId%2522%253A%2522uVLxW6dq7hjAvalbILpc%2522%257D&layers=1&nav=1&title=scaling-web-app.drawio&page-id=uVLxW6dq7hjAvalbILpc#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%26export%3Ddownload"></iframe>


## Redundancy for the database

The current design has one database run on one server, so it does not support failover and redundancy. Database replication is a common technique to address those problems.

<!-- scaling-web-app.drawio\scaling database -->
<iframe frameborder="0" style="width:100%;height:659px;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=https%3A%2F%2Fapp.diagrams.net%2F%23G1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%23%257B%2522pageId%2522%253A%2522keHfDQNO_mXEXI1srIso%2522%257D&layers=1&nav=1&title=scaling-web-app.drawio&page-id=keHfDQNO_mXEXI1srIso#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%26export%3Ddownload"></iframe>


## Improving response time

Here we improve performance of the web app by storing frequently accessed data in a cache layer, much faster then the database.

After receiving a request, a web server first checks if the cache has the available response. If it has, it sends data back to the client. If not, it queries the database, stores the response in cache, and sends it back to the client (read-through strategy).

<!-- scaling-web-app.drawio\caching -->
<iframe frameborder="0" style="width:100%;height:659px;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=https%3A%2F%2Fapp.diagrams.net%2F%23G1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%23%257B%2522pageId%2522%253A%2522e-EDtGbRkuV0W_EjE2Hr%2522%257D&layers=1&nav=1&title=scaling-web-app.drawio&page-id=e-EDtGbRkuV0W_EjE2Hr#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%26export%3Ddownload"></iframe>


## Improving asset's load time

Static assets (JS, CSS, images, etc.,) are no longer served by web servers. They are fetched from the CDN for better performance.

<!-- scaling-web-app.drawio\cdn -->
<iframe frameborder="0" style="width:100%;height:659px;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=https%3A%2F%2Fapp.diagrams.net%2F%23G1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%23%257B%2522pageId%2522%253A%2522RqgIj2kOrB5L2GNeduSk%2522%257D&layers=1&nav=1&title=scaling-web-app.drawio&page-id=RqgIj2kOrB5L2GNeduSk#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%26export%3Ddownload"></iframe>