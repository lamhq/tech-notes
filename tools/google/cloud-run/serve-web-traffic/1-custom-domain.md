# Mapping custom domains

## Limitations

It is **not** possible to use Cloud Run domain mappings in the following [regions](https://cloud.google.com/run/docs/mapping-custom-domains#limitations)


## Mapping a custom domain to a service

1. Go to the [domain mappings page](https://console.cloud.google.com/run/domains) in the Google Cloud Console
2. In the Domain Mappings page, click **Add Mapping**.
3. From the dropdown list in the **Add Mapping** form, select the service you are mapping the custom domain to:

![](https://cloud.google.com/run/docs/images/add-mapping-form.png)

4. Enter the domain name. Click **Continue**.
5. Update your DNS records at your domain registrar web site using the DNS records displayed in the last step.
6. Click **Done**.

## Add your DNS records at your domain registrar

1. Retrieve the DNS record information for your domain mappings

![](https://cloud.google.com/run/docs/images/select-dns.png)

2. Log in to your account at your domain registrar and then open the DNS configuration page.
3. Add each of the above DNS records to the account at the DNS provider
4. Test for success by browsing to your service at its new URL. Note that it can take several minutes for the managed SSL certificate to be issued.