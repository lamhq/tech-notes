# S3 Object Lock

You can use S3 Object Lock to store objects using a **write once, read many (WORM)** model. It can help prevent objects from being deleted or modified for a fixed amount of time or indefinitely.

You can use S3 Object Lock to meet regulatory requirements that require WORM storage, or add an extra layer of protection against object changes and deletion.


## Modes

S3 Object Lock has two different modes: Governance Mode and Compliance mode.

### Governance Mode

In governance mode, users can't overwrite or delete an object version or alter its lock settings unless they have special permissions.

With governance mode, you protect objects against being deleted by most users, but **you can still grant some users permission to alter the retention settings** or delete the obiect if necessary.

### Compliance Mode

In compliance mode, **a protected object version can't be overwritten or deleted by any user**, including the root user in your AWS account.

When an object is locked in compliance mode, its **retention mode can't be changed** and its retention period can't be shortened.

Compliance mode ensures an object version can't be overwritten or deleted for the duration of the **retention period**.


## Retention Periods

A retention period protects an object version for a 
fixed amount of time.

When you place a retention period on an object version,
Amazon S3 stores a timestamp in the object version's metadata to indicate when the retention period expires.

After the retention period expires, the object version can be overwritten or deleted unless you also placed a **legal hold** on the object version.


## Legal Holds

S3 Object Lock also enables you to place a legal hold on an object version. 

Like a retention period, a legal hold **prevents an object version from being overwritten or deleted**. However, a legal hold **doesn't have an associated retention period** and remains in effect until removed.

Legal holds can be freely placed and removed by any user who has
the `s3: PutObjectLegalHold` permission.


## Glacier Vault Lock

Glacier Vault Lock is a way of applying a WORM model to Glacier.

S3 Glacier Vault Lock allows you to easily deploy and enforce compliance controls for individual
S3 Glacier vaults with a vault lock policy. 

You can specify controls, such as WORM, in a vault lock policy and lock the policy from future edits.

Once locked, the policy can no longer be changed.