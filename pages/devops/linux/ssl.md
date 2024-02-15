# SSL

## Generate a CSR (Certificate Signing Request)

```sh
openssl req -new -newkey rsa:2048 -nodes -keyout example.com.key -out example.com.csr
```

`req`: enables the part of OpenSSL that handles certificate requests signing.
`-newkey rsa:2048 `creates a 2048-bit RSA key.
`-nodes` means "don't encrypt the key".
`-keyout example.com.key` specifies the filename to write on the created private key.
`-out example.com.csr` specifies the filename to write the CSR to.


## Install Comodo Certificates to Amazon AWS 

Reference: [Install your Comodo Certificates to Amazon AWS](https://guillaumemaka.com/2015/05/06/install-your-comodo-certificates-to-amazon-aws/)

Comodo send you 4 certificates:

- `AddTrustExternalCARoot.crt`
- `<your_issued_certificate_name>.crt`: for instance cdn_guillaumemaka_com.crt in my case.
- `COMODORSAAddTrustCA.crt`
- `COMODORSADomainValidationSecureServerCA.crt`

Amazon AWS need:

- Your issued certificate (in PEM format)
- Your private key
- The CAChain certificate that include all intermediate and Root CA certificate. (in PEM format)

AWS need that all your certificates are in PEM format. They are two main of encoding certificate:

- `DER`: is a binary encoding of a certificate. Typically these use the file extension of `.crt` or `.cert`.
- `PEM`: is a Base64 encoding of a certificate represented in ASCII therefore it is readable as a block of text. This is very useful as you can open it in a text editor work with the data more easily.

Comodo certificate are delivered in DER format `.crt`, so we need to convert them to PEM.

### Convert crt to PEM

```sh
cd /path/to/certificates/folder
mkdir pem

openssl x509 -in ./AddTrustExternalCARoot.crt -outform pem -out ./pem/AddTrustExternalCARoot.pem
openssl x509 -in ./COMODORSAAddTrustCA.crt -outform pem -out ./pem/COMODORSAAddTrustCA.pem
openssl x509 -in ./COMODORSADomainValidationSecureServerCA.crt -outform pem -out ./pem/COMODORSADomainValidationSecureServerCA.pem
openssl x509 -in ./cdn_guillaumemaka_com.crt -outform pem -out ./pem/cdn_guillaumemaka_com.pem
```

- `x509`: The x509 command is a multi purpose certificate utility. It can be used to display certificate information, convert certificates to various forms, sign certificate requests like a "mini CA” or edit certificate trust settings.
- `-in <filename>`: This specifies the input filename to read a certificate from or standard input if this option is not specified.
- `-outform PEM`: This specifies the output format. In this case PEM.
- `-out filename` : This specifies the output filename to write to or standard output by default.


### Create a CAChain

```sh
cat ./pem/COMODORSADomainValidationSecureServerCA.pem > ./pem/CAChain.pem
cat ./pem/COMODORSAAddTrustCA.pem >> ./pem/CAChain.pem
cat ./pem/AddTrustExternalCARoot.pem >> ./pem/CAChain.pem
```


## Make Sure Your CSR, SSL Certificate and Private Key Match

To check whether a certificate matches a private key, or a CSR matches a certificate, you'll need to run following OpenSSL commands:

```sh
openssl pkey -in PRIVATEKEY.key -pubout -outform pem | sha256sum
openssl x509 -in certificate.crt -pubkey -noout -outform pem | sha256sum
openssl req -in CSR.csr -pubkey -noout -outform pem | sha256sum
```
