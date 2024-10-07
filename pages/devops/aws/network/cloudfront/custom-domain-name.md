# Custom Domain Name

## Overview

CloudFront typically creates a domain name such as `a232323.cloudfront.net`.

To use alternate domain names for your CloudFront distribution:
- If your domain is managed in Route 53, you can add an **alias record** pointing to your CloudFront distribution.
- For other service providers, you add a **CNAME record** with value is your CloudFront distribution domain name.

To move domain names between distributions:
- You can move subdomains yourself.
- For the root domain you need to use AWS support.

To use custom domain name managed by service providers:

## Step 1: Point the domain name to your CloudFront distribution:
1. Log in to your DNS provider's management console (e.g., Route 53, Cloudflare, etc.).
2. Add a new CNAME record:
   - **Name**: Enter the domain you want to use (e.g., `sub.example.com`).
   - **Value**: Enter the CloudFront distribution domain name (e.g., `d123456abcdef8.cloudfront.net`).

## Step 2: Request a public SSL in AWS Certificate Manager:
1. In the [ACM Console](https://console.aws.amazon.com/acm/home)
2. Choose "Request certificate" in the left navigation
3. For **Certificate type**, Select "Request a public certificate", click **Next**
4. Enter the domain name, such as `api.example.com` or `*.example.com` for a wildcard certificate that covers multiple subdomains
5. For **Validation method**, select **DNS validation**

Before the Amazon certificate authority can issue a certificate for your site, ACM must prove that you own or control all of the domain names that you specify in your request.

## Step 3: To set up DNS validation for your domain name:
1. In the [ACM Console](https://console.aws.amazon.com/acm/home), open the details page for the new certificate
2. Copy the **CNAME name** and **CNAME value** displayed in the **Domains** section.
3. Log in to your DNS provider's management console, add a new CNAME record with name and value from your copied value

## Step 4: Set up your CloudFront distribution to use the custom domain name
1. In the CloudFront distribution settings, add your custom domain name in the "Alternate Domain Names (CNAMEs)" field.
2. In **Custom SSL certificate** section, choose the requested certificate from the previous step
3. Don't check the option **Legacy clients supports**, which cost $600/month
4. Click **Save Change**


## References

- [Add an alternate domain name](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CreatingCNAME.html)
- [Setting up DNS validation](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html#setting-up-dns-validation)
