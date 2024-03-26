# Custom domains

## Overview

When you use Amplify to deploy your web app, Amplify hosts it for you on the default `amplifyapp.com` domain with a URL such as https://branch-name.d1m7bkiki6tdw1.amplifyapp.com.

When you connect your app to a custom domain, users see that your app is hosted on a custom URL, such as https://www.example.com.


## Adding a custom domain

When you add a custom domain, you need to complete these steps:

- **SSL/TLS creation**: AWS Amplify issues an SSL/TLS certificate (for managed certificate)
- **SSL/TLS configuration and verification**: Amplify verifies that you are the owner of the domain.
  - For domains managed outside of Route 53, you must manually add the DNS verification record provided in the Amplify console into your domain with a third-party DNS provider.
- **Domain activation**: The domain is successfully verified by Amplify.


## Manage subdomains

See [Manage subdomains](https://docs.aws.amazon.com/amplify/latest/userguide/to-manage-subdomains.html).


## Wildcard subdomains

See [Wildcard subdomains](https://docs.aws.amazon.com/amplify/latest/userguide/wildcard-subdomain-support.html).


## Certificate

When you set up your custom domain, you can use the default managed certificate that Amplify provisions for you or you can use your own custom certificate.


### Update the SSL/TLS certificate for a domain

You can change the SSL/TLS certificate that is in use for a domain at any time.

To update the SSL/TLS certificate for a domain:

1. Open the **Amplify console** in **AWS Management Console**.
2. Choose the app you want to update.
3. Select **App Settings**, and then choose **Domain management**.
4. On the **Domain management** page, click **Manage domain**.
5. In the **Choose your certificate** section:
    - To change from a custom certificate to the default **Amplify managed certificate**, choose **Amplify managed certificate**.
    - To change from a managed certificate to a custom certificate, choose **Custom SSL certificate** and select the certificate from the list.
    - To change a custom certificate to a different custom certificate, select the new certificate from the list under **Custom SSL certificate**.
6. Click **Update**.


## References

- [Configure a custom domain](https://docs.amplify.aws/react/deploy-and-host/custom-configuration/configure-custom-domain/)
