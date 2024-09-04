# Load balancer

## Overview

A load balancer evenly distributes incoming traffic among servers that are defined in a load-balanced set.

A load balancer communicates with servers through private IPs. A private IP is an IP address reachable only between servers in the same network; however, it is unreachable over the internet.

Servers are unreachable directly by clients anymore.

<!-- scaling-web-app.drawio\load balancer -->
<iframe frameborder="0" style="width:100%;height:473px;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=https%3A%2F%2Fapp.diagrams.net%2F%23G1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%23%257B%2522pageId%2522%253A%2522EADSuXCYXhjZmKITLNcT%2522%257D&layers=1&nav=1&title=scaling-web-app.drawio&page-id=EADSuXCYXhjZmKITLNcT#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%26export%3Ddownload"></iframe>