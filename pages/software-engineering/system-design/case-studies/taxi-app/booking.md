# Booking Driver

## Requirements

We need to determine what happens when a user requests a ride.

To achieve this, we developed a Matching Service that:
- Communicates with the Driver Location Service to retrieve nearby drivers
- Choose a driver when a customer submits a ride request

## Choosing a driver

### Approach #1: Sequental

1. Send an offer to a driver and wait for a few seconds.
2. If the offer is declined or times out, send the offer to a different driver.
3. Repeat step 1 until either all drivers are exhausted or one accepts the offer.

Pros:
- Simple

Cons:
- Slow for customers, as it can take a significant amount of time until a driver accepts the offer.


### Approach #2: Concurrent

1. Broadcast the offer to all drivers simultaneously
2. The first accepts the offer win

Pros:
- Help customer get a taxi faster

Cons:
- Could annoy drivers, as some may accept the offer but is notified not win it.


## Notifying drivers

How to Notify Drivers of a New Request and Pickup Instructions?

We utilize a Driver Gateway layer that maintains the WebSocket connection with the driver's mobile app. This layer performs the following tasks:

1. Receive driver's location
2. Send ride requests to drivers
3. Provide directions for picking up the customer

Overall, we aim to have API layers that abstract the internal workings of the system and offer a single point of entry.


## Notifying customers

How to Inform Customers That a Taxi is On the Way?

Since the customer mobile apps use REST for communication, simple polling is the easiest method.

We can implement a Customer Gateway to handle communication with the customer mobile app.

Here's how a ride request process works:

1. Customer places a request for a ride
2. The request goes to the Customer Gateway
3. Customer Gateway tells the Matching Service to find a driver and returns a unique identifier (UUID) for the request
4. The customer app periodically checks the status of the request
5. Once a driver is found or if the request cannot be fulfilled, we return the result to the customer