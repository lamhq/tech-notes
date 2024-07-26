## Standard queues

Default queue type.

Nearly unlimited transactions per second.

Messages could be received out of order.

Messages can be duplicated:
- Reason: visibility timeout is too low or applications do not delete messages after processing
- Design your applications to be idempotent (they should not be affected adversely when processing the same message more than once).
- You can include a unique ordering ID in each message, and have the backend application use this to deduplicate messages.

Ideal for sending data between applications when the throughput is important

Example use cases:
- Decouple live user requests from intensive background work: let users upload media while resizing or encoding it.
- Allocate tasks to multiple worker nodes: process a high number of credit card validation requests.
- Batch messages for future processing: schedule multiple entries to be added to a database.