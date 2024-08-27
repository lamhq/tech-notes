# Design a Scalable System

## Overview

Designing a system that supports millions of users.

In this topic, we build a system that supports a single user and gradually scale it up to serve millions of users.


## Single Server

Start with a single server setup where everything is running on one server: web app, database, cache, etc.

The traffic to the server comes from two sources: web browser and mobile application:
- Web browser: sending HTTP requests (GET, POST, etc.) to the server. The server processing these requests and send back HTML content
- Mobile application: communicate with servers using APIs. JSON is a lightweight data format commonly used for API communication.

<!-- scalable-system.drawio\single server -->
<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;https://app.diagrams.net/#G1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK#%7B%22pageId%22%3A%22QPsRIN0huZrPv1nBiWiu%22%7D&quot;,&quot;url&quot;:&quot;https://drive.google.com/uc?id=1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK&amp;export=download&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/embed2.js?&fetch=https%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%26export%3Ddownload"></script>


## Separated Database Server

With the growth of the user base, we need multiple servers: one for web/mobile traffic, the other for the database.

Separating web/mobile traffic (web tier) and database (data tier) servers allows them to be scaled independently.

<!-- scalable-system.drawio\database -->
<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;page&quot;:1,&quot;toolbar&quot;:&quot;pages zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;https://app.diagrams.net/#G1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK#%7B%22pageId%22%3A%22z6L2SULGltuUVYjcrTCg%22%7D&quot;,&quot;url&quot;:&quot;https://drive.google.com/uc?id=1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK&amp;export=download&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/embed2.js?&fetch=https%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%26export%3Ddownload"></script>

Drawbacks:
- Users are connected to the web server directly. Users will unable to access the website if the web server is offline.
- If many users access the web server simultaneously and it reaches the web server’s load limit, users generally experience slower response or fail to connect to the server.