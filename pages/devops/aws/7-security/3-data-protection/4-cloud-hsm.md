# AWS CloudHSM

## HSM

A hardware security module (HSM) is a physical computing device that safeguards and manages digital keys and performs encryption and decryption functions.

An HSM contains one or more secure cryptoprocessor chips.


## Overview

AWS CloudHSM is a cloud-based HSM that enables you to easily generate and use your own encryption keys on the AWS Cloud.

It is a physical device, entirely dedicated to you, that can be deployed in a highly available fashion.


## KMS vs. CloudHSM

KMS:
- Shared tenancy of underlying hardware
- Automatic key rotation
- Automatic key generation

CloudHSM:
- Dedicated HSM to you
- Full control of underlying hardware
- Full control of users, groups, keys, etc.
- No automatic key rotation