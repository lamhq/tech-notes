# Access Control

## Attribute-based access control

Attribute-based access control (ABAC) is an authorization process that defines permissions based on tags that are attached to users and AWS resources.

ABAC by allowing you to control access to your Amazon SQS queues based on the tags and aliases that are associated with an Amazon SQS queue.

You can also attach tags to IAM principals to create an ABAC policy. You can design ABAC policies to allow Amazon SQS operations when the tag on the IAM user role that's making the call matches the Amazon SQS queue tag.


## Access policy

The access policy defines the accounts, users, and roles that can access the queue.

The access policy also defines the actions (such as `SendMessage`, `ReceiveMessage`, or `DeleteMessage`) that the users can access.

The default policy allows only the queue owner to send and receive messages.
