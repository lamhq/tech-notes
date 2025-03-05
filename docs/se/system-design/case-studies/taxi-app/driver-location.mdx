# Driver Location

## Update Frequency

To find drivers, we need their locations.

Drivers will send their positions every 5 seconds.


## Communication

The locations will be sent from the mobile app to the system through:
- **REST**: Acceptable
- **UDP**: Better, we can allow losing some messages
- **WebSocket**: We don't really need two-way communication, but WebSocket may allow us to solve other issues in the future; let's stick with it


## Payload

Location data to sent:
- `latitude`: float
- `longitude`: float
- `direction?`: float
- `driver_id?`: uuid (not necessary if using WebSocket)


## Throughput

- Total driver-hours per day = 500k x 6 = 3M
- Number of active drivers at a time = 3M / 24 = 125k
- Requests per second for one driver = 1 / 5 = 0.2
- Total requests per second (rps) = 125k x 0.2 = 25k

There can be spikes in requests during peak times:
- X2 = 50k rps
- X4 = 100k rps
- X10 = 250k rps

Let's agree that it will be X2 drivers during peak hours.

The challenge for our system is handling 50K write operations per second.