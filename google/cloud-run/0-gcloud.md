# Google Cloud SDK

## Installing Google Cloud SDK for macOS

1. Cloud SDK requires Python 3 (preferred, 3.5 to 3.8) or Python 2 (2.7.9 or higher)

```sh
python -v
```

2. Get machine hardware name:

```sh
uname -m
```

3. Download for `x86_64`

- [macOS 64-bit
(x86_64)](https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-347.0.0-darwin-x86_64.tar.gz)

4. Use the install script to add Cloud SDK tools to your `PATH`

```sh
./google-cloud-sdk/install.sh
```

5. Run gcloud init to initialize the SDK:

```sh
./google-cloud-sdk/bin/gcloud init
```

## Add configuration

```sh
gcloud config configurations create <CONFIG_NAME>
gcloud config set project <PROJECT_ID>
```

## List configuration

```sh
gcloud config configurations list
```

## Active a configuration

```sh
gcloud config configurations activate notebook-test
```