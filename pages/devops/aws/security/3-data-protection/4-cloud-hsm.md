# AWS CloudHSM

## HSM

A hardware security module (HSM) is a physical computing device that:
- safeguards and manages digital keys
- performs encryption and decryption functions.

An HSM contains one or more secure cryptoprocessor chips.


## Overview

AWS CloudHSM is a cloud-based HSM that enables you to easily generate and use your own encryption keys on the AWS Cloud.

It is a physical device, entirely dedicated to you, that can be deployed in a highly available fashion.


## KMS vs. CloudHSM

### KMS
- You're using a shared tenancy of underlying hardware
- Support automatic key rotation
- Support automatic key generation

### CloudHSM
- Dedicated HSM to you
- Have full control of underlying hardware
- Have full control of users, groups, keys, etc.
- No automatic key rotation