# Amazon CloudFront

Amazon CloudFront is a content delivery network. The purpose of CloudFront is to deliver data, videos, applications, and websites to your customers globally with low latency and high transfer speeds.

CloudFront is an external caching solution, it resides between your website and the people visiting your website. 

CloudFront is the only option to add HTTPS to a static website being hosted in an S3 bucket.

Amazon has edge locations worldwide, which are used to serve your website. The files are stored in the edge location's cache for a period of time specified by you, and if a visitor requests content that has been cached longer than the expiration time, CloudFront checks the origin server to see if a new version of the file is available. If it is, it copies the new version over to the edge location. 

CloudFront also provides additional features, including security against multiple types of network and denial of service attacks, protection against sudden traffic spikes, and Lambda at Edge, which improves performance by running your Lambda code at edge locations.

CloudFront provides real-time metrics and logging so that you can monitor what's being requested, where from, and how quickly. 

CloudFront's pricing is cost-effective, and it uses pay-as-you-go pricing with no minimum fees.