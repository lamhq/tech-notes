# AWS CloudHSM

## HSM

A hardware security module (HSM) is a physical computing device that safeguards and manages digital keys and performs encryption and decryption functions.

An HSM contains one or more secure cryptoprocessor chips.


## Overview

AWS CloudHSM is a cloud-based HSM that enables you to easily generate and use your own encryption keys on the AWS Cloud.

It is a physical device, entirely dedicated to you, that can be deployed in a highly available fashion.


## KMS vs. CloudHSM

KMS:
- You're using a shared tenancy of underlying hardware
- You have Automatic key rotation
- You have Automatic key generation

CloudHSM:
- Dedicated HSM to you
- You get full control of underlying hardware
- You get full control of users, groups, keys, etc.
- No automatic key rotation