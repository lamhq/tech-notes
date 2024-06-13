# Read consistency

## Eventually consistent reads

Consistency across all copies of data is usually reached within a second.

Repeating a read after a short time should return the updated data.

Best read performance.

## Strongly consistent reads

A strongly consistent read returns a result that reflects all writes that received a successful response prior to the read.

You don't need to wait for all the updates complete before reading the data.