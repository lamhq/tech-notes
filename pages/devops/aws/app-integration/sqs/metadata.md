# Message metadata

## Message attributes

You can use message attributes to attach custom metadata to Amazon SQS messages for your applications.

Each message can have up to 10 attributes.

Message attribute are included in the 256 KB message size restriction.

Your consumer can handle a message using message attributes without having to process the message body first.

Each message attribute consists of Name, Type (String, Number, Binary), Value


## Message system attributes

you can use message system attributes to store metadata for other AWS services, such as AWS X-Ray.

Message system attributes are structured exactly like message attributes

Currently, the only supported message system attribute is `AWSTraceHeader`.

The size of a message system attribute doesn't count towards the total size of a message.