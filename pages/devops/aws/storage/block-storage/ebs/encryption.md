# Encryption

You can encrypt your EBS Volumes with a data key (AES-256 standard).

You can either manage the key yourself (CMK) or you can have Amazon manage (AWS KMS) it for you.

Encryption has a minimal impact on larency. You won't get any performance degradation.

You can encrypt root device volume upon creation.

You can allow encryption when copying an unencrypted snapshot.

When you encrypt an EBS volume:
- data inside the volume is encrypted
- data moving between instance and volume is encrypted
- snapshots are encrypted
- volumes created from snapshots are encrypted

To encrypt an volume:
- create a snapshot of unencrypted volume
- copy the snapshot with encryption enabled
- create an AMI from the encrypted snapshot
- use that AMI to launch new instances

You can **unencrypt a volume** by copying it to a unencrypted volume using a temporary EC2 instance. You can then attach the unencrypted volume to your original instance.
