# Overview of AWS Storage Gateway

AWS Storage Gateway is a service that facilitates seamless access to cloud storage while preserving on-premises capabilities.

AWS Storage Gateway is a valuable tool for organizations seeking to leverage cloud storage capabilities while maintaining on-premises infrastructure.

AWS Storage Gateway offers three distinct storage gateways, each catering to different use cases, transforming traditional storage solutions.

## File Gateway

The File Gateway provides SMB and NFS interfaces to Amazon S3. It essentially creates a network drive on Windows and Linux systems, enabling users to store data as if it were on a local drive.

The gateway transparently stores these files in Amazon S3, making them accessible for integration with various AWS services like machine learning, analytics, and AWS Lambda.

This gateway bridges the gap for local applications, allowing them to store data in the cloud effortlessly.

## Tape Gateway

Tape Gateway emulates a virtual tape library on your local network, designed for organizations transitioning from traditional tape backups to cloud-based solutions. It seamlessly integrates with popular backup software, ensuring a smooth transition.

The tape contents are stored in Amazon S3, offering the option to implement S3 Glacier or S3 Deep Archive for long-term archival. 

This gateway eliminates the need for expensive tape drives, offsite storage costs, and hardware maintenance, simplifying the migration process.

## Volume Gateway

Volume Gateway presents an iSCSI block storage volume to on-premises applications. It manages on-premises data in Amazon S3, operating in either cached mode or stored mode.

In cached mode, frequently accessed data is stored locally for low-latency access, while in stored mode, all data is stored locally and asynchronously backed up to S3. This gateway ensures a flexible approach to on-premises data storage, accommodating various use cases.
