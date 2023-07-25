# Types of Coupling

Here are different types of coupling, organized from low (desirable) to high (undesirable):

## Domain Coupling

1. Domain coupling describes a situation in which one microservice needs to interact with another microservice because it requires the functionality provided by the other microservice.
2. In the example shown in Figure 2-2, the Order Processor microservice calls the Warehouse and Payment microservices for reserving stock and taking payment, respectively. The Order Processor microservice is dependent on and coupled to the Warehouse and Payment microservices for this operation.
![](images/domain-coupling.png)
4. In a microservice architecture, some level of interaction between microservices is unavoidable for collaboration.
5. However, it is desirable to minimize dependencies where a single microservice depends on multiple downstream services, as it may indicate that the microservice is performing too many tasks.
6. Domain coupling is considered a loose form of coupling, but it can still lead to problems if there are excessive dependencies or complex data exchanges between services.
7. Information hiding is important in microservices; only share necessary information and send the minimum amount of data required.


## Temporal coupling

1. Temporal coupling refers to situations in which concepts are bundled together because they happen at the same time.
2. In the context of distributed systems, temporal coupling occurs when one microservice requires another microservice to perform an action simultaneously for the operation to complete.
3. Both microservices need to be up and available at the same time for communication to happen successfully.
4. In Figure 2-3, the MusicCorp's Order Processor makes a synchronous HTTP call to the Warehouse microservice, requiring Warehouse to be accessible during the call. If Warehouse cannot be reached, the operation fails as the CDs cannot be reserved.
![](images/temporal-coupling.png)

6. Temporal coupling can lead to resource contention as the Order Processor may have to wait for a response from Warehouse.
7. Temporal coupling becomes more challenging with more microservices and complex interactions, making it harder to scale and maintain the system.
8. Asynchronous communication, such as using a message broker, can help mitigate temporal coupling.


## Pass-Through Coupling

1. Pass-through coupling occurs when one microservice passes data to another microservice because it is needed by a downstream microservice.
2. Pass-through coupling can be problematic as it requires the caller to know about the microservice being invoked and potentially how the one-step-removed microservice works.
3. Changes to the required data downstream can cause significant upstream changes.

We have an **Order Processor**, which is sending a request to **Warehouse** to prepare an order for dispatch. As part of the request payload, we send along a **Shipping Manifest**. This **Shipping Manifest contains** not only the address of the customer but also the shipping type. The **Warehouse** just passes this manifest on to the downstream **Shipping** microservice.

![](images/ps-c1.png)

4. One possible solution is for the calling microservice to bypass the intermediary and communicate directly with the downstream microservice.

In our example, **Order Processor** speaks directly to **Shipping**. However, this causes some other headaches. Our **Order Processor** is increasing its domain coupling, as **Shipping** is yet another microservice it needs to know about—if that was the only issue, this might still be fine, as domain coupling is of course a looser form of coupling.

This solution gets more complex here, though, as stock has to be reserved with **Warehouse** before we dispatch the package using **Shipping**, and after the shipping has been done we need to update the stock accordingly. This pushes more complexity and logic into **Order Processor** that was previously hidden inside **Warehouse**.

![](images/ps-c2.png)

5. Another solution is to hide the requirement for certain data from the calling microservice by having an intermediary microservice handle the data construction locally.

For this specific example, I might consider a simpler change, to totally hide the requirement for a **Shipping Manifest** from **Order Processor**. The idea is delegate the work of both managing stock and arranging for dispatch of the package to our **Warehouse** service.

**Warehouse** take in the required information as part of its contract, and then have it construct the **Shipping Manifest** locally. This means that if the **Shipping** service changes its service contract, this change will be invisible from the viewpoint of **Order Processor**, as long as **Warehouse** collects the required data.

![](images/ps-c3.png)

6. One final approach to reducing pass-through coupling is for the intermediary microservice to forward the data without processing or understanding its structure. Changes in the format of the data still require changes to both the calling microservice and the downstream microservice, but the intermediary microservice doesn't need to change.


**Order Processor** still send the **Shipping Manifest** to the **Shipping** microservice via the **Warehouse**, but to have the **Warehouse** be totally unaware of the structure of the **Shipping Manifest** itself. The **Order Processor** sends the manifest as part of the order request, but the **Warehouse** makes no attempt to look at or process the field. Instead, it just sends it along.

A change in the format of the the **Shipping Manifest** would still require a change to both the **Order Processor** and the **Shipping** microservice, but as the **Warehouse** doesn’t care about what is actually in the manifest, it doesn’t need to change.
