# Encryption

## At-rest
You can encrypt your **Amazon RDS instances and snapshots at rest** by enabling the encryption option for your Amazon RDS DB instance.

Encryption at rest is supported for all DB types and uses AWS KMS.

When using encryption at rest, the following elements are also encrypted:
- All DB snapshots.
- Backups.
- DB instance storage.
- Read Replicas.

### Read Replicas

A Read Replica of an Amazon RDS encrypted instance is also encrypted using the same key as the master instance when both are in the **same region**.

If the master and Read Replica are in **different regions**, you encrypt using the encryption key for that region.

Read replicas and Multi-AZ standby instance must have the same encryption status with the master DB.


### Encrypt an existing DB

To **encrypt an existing DB**, you need to create a snapshot, copy it, encrypt the copy, then build an encrypted DB from the snapshot.


## In-transit

RDS creates an SSL certificate and installs the certificate on the DB instance when Amazon RDS provisions the instance.

The SSL certificate includes the DB instance endpoint as the Common Name (CN) for the SSL certificate to guard against spoofing attacks.

You can download a root certificate from AWS that works for all Regions or you can download Region-specific intermediate certificates.
